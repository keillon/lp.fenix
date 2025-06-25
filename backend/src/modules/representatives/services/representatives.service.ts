import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Representative } from '../entities/representative.entity';
import { CreateRepresentativeDto } from '../dto/create-representative.dto';
import { UpdateRepresentativeDto } from '../dto/update-representative.dto';

@Injectable()
export class RepresentativesService {
  constructor(
    @InjectRepository(Representative)
    private representativesRepository: Repository<Representative>,
  ) {}

  /**
   * Cria um novo representante
   */
  async create(createRepresentativeDto: CreateRepresentativeDto): Promise<Representative> {
    const representative = this.representativesRepository.create(createRepresentativeDto);
    return this.representativesRepository.save(representative);
  }

  /**
   * Retorna todos os representantes com paginação, busca e filtro por status
   */
  async findAll(
    search?: string,
    status?: 'pending' | 'approved' | 'rejected',
    skip?: number,
    take?: number,
  ): Promise<Representative[]> {
    const query = this.representativesRepository.createQueryBuilder('representative')
      .orderBy('representative.createdAt', 'DESC');

    if (search) {
      query.where(
        '(representative.fullName ILIKE :search OR representative.email ILIKE :search OR representative.phone ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (status) {
      query.andWhere('representative.status = :status', { status });
    }

    if (skip !== undefined) {
      query.skip(skip);
    }

    if (take !== undefined) {
      query.take(take);
    }

    return query.getMany();
  }

  /**
   * Encontra um representante pelo ID
   */
  async findOne(id: string): Promise<Representative> {
    const representative = await this.representativesRepository.findOne({
      where: { id },
    });
    
    if (!representative) {
      throw new NotFoundException(`Representante com ID ${id} não encontrado`);
    }
    
    return representative;
  }

  /**
   * Atualiza um representante existente
   */
  async update(id: string, updateRepresentativeDto: UpdateRepresentativeDto): Promise<Representative> {
    const representative = await this.findOne(id);
    
    // Atualizar apenas os campos fornecidos
    Object.assign(representative, updateRepresentativeDto);
    
    // Log para debug - antes de salvar
    console.log(`[RepresentativesService] Atualizando representante ${id}:`, representative);
    
    // Salvar as alterações
    const savedRepresentative = await this.representativesRepository.save(representative);
    
    // Log para debug - após salvar
    console.log(`[RepresentativesService] Representante ${id} atualizado:`, savedRepresentative);
    
    return savedRepresentative;
  }

  /**
   * Atualiza o status de um representante
   */
  async updateStatus(
    id: string, 
    status: 'pending' | 'approved' | 'rejected',
    message?: string,
  ): Promise<Representative> {
    const representative = await this.findOne(id);
    
    // Atualizar o status
    representative.status = status;
    
    // Atualizar a mensagem, se fornecida
    if (message !== undefined) {
      representative.message = message;
    }
    
    // Log para debug - antes de salvar
    console.log(`[RepresentativesService] Atualizando status do representante ${id} para ${status}`);
    
    try {
      // Salvar as alterações
      const savedRepresentative = await this.representativesRepository.save(representative);
      
      // Log para debug - após salvar
      console.log(`[RepresentativesService] Status do representante ${id} atualizado com sucesso`);
      
      return savedRepresentative;
    } catch (error) {
      console.error(`[RepresentativesService] Erro ao atualizar status do representante ${id}:`, error);
      throw error;
    }
  }

  /**
   * Remove um representante
   */
  async remove(id: string): Promise<void> {
    const representative = await this.findOne(id);
    await this.representativesRepository.remove(representative);
  }

  /**
   * Retorna estatísticas dos representantes
   */
  async getStats(): Promise<any> {
    const total = await this.representativesRepository.count();
    
    const pending = await this.representativesRepository.count({
      where: { status: 'pending' },
    });
    
    const approved = await this.representativesRepository.count({
      where: { status: 'approved' },
    });
    
    const rejected = await this.representativesRepository.count({
      where: { status: 'rejected' },
    });
    
    return {
      total,
      pending,
      approved,
      rejected,
    };
  }
} 