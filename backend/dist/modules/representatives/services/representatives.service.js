"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepresentativesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const representative_entity_1 = require("../entities/representative.entity");
let RepresentativesService = class RepresentativesService {
    constructor(representativesRepository) {
        this.representativesRepository = representativesRepository;
    }
    async create(createRepresentativeDto) {
        const representative = this.representativesRepository.create(createRepresentativeDto);
        return this.representativesRepository.save(representative);
    }
    async findAll(search, status, skip, take) {
        const query = this.representativesRepository.createQueryBuilder('representative')
            .orderBy('representative.createdAt', 'DESC');
        if (search) {
            query.where('(representative.fullName ILIKE :search OR representative.email ILIKE :search OR representative.phone ILIKE :search)', { search: `%${search}%` });
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
    async findOne(id) {
        const representative = await this.representativesRepository.findOne({
            where: { id },
        });
        if (!representative) {
            throw new common_1.NotFoundException(`Representante com ID ${id} não encontrado`);
        }
        return representative;
    }
    async update(id, updateRepresentativeDto) {
        const representative = await this.findOne(id);
        Object.assign(representative, updateRepresentativeDto);
        console.log(`[RepresentativesService] Atualizando representante ${id}:`, representative);
        const savedRepresentative = await this.representativesRepository.save(representative);
        console.log(`[RepresentativesService] Representante ${id} atualizado:`, savedRepresentative);
        return savedRepresentative;
    }
    async updateStatus(id, status, message) {
        const representative = await this.findOne(id);
        representative.status = status;
        if (message !== undefined) {
            representative.message = message;
        }
        console.log(`[RepresentativesService] Atualizando status do representante ${id} para ${status}`);
        try {
            const savedRepresentative = await this.representativesRepository.save(representative);
            console.log(`[RepresentativesService] Status do representante ${id} atualizado com sucesso`);
            return savedRepresentative;
        }
        catch (error) {
            console.error(`[RepresentativesService] Erro ao atualizar status do representante ${id}:`, error);
            throw error;
        }
    }
    async remove(id) {
        const representative = await this.findOne(id);
        await this.representativesRepository.remove(representative);
    }
    async getStats() {
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
};
exports.RepresentativesService = RepresentativesService;
exports.RepresentativesService = RepresentativesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(representative_entity_1.Representative)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RepresentativesService);
//# sourceMappingURL=representatives.service.js.map