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
exports.QuotationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quotation_entity_1 = require("../entities/quotation.entity");
let QuotationsService = class QuotationsService {
    constructor(quotationsRepository) {
        this.quotationsRepository = quotationsRepository;
    }
    async create(createQuotationDto) {
        console.log('DEBUG - Salvando cotação:', createQuotationDto);
        const quotation = this.quotationsRepository.create(createQuotationDto);
        const saved = await this.quotationsRepository.save(quotation);
        console.log('DEBUG - Cotação salva:', saved);
        return saved;
    }
    async findAll(email) {
        if (email) {
            return this.quotationsRepository.find({
                where: { email },
                order: { createdAt: 'DESC' },
            });
        }
        return this.quotationsRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const quotation = await this.quotationsRepository.findOne({
            where: { id },
        });
        if (!quotation) {
            throw new common_1.NotFoundException(`Cotação com ID ${id} não encontrada`);
        }
        return quotation;
    }
    async update(id, updateQuotationDto) {
        const quotation = await this.findOne(id);
        Object.assign(quotation, updateQuotationDto);
        return this.quotationsRepository.save(quotation);
    }
    async updateStatus(id, status, value, message) {
        const quotation = await this.findOne(id);
        quotation.status = status;
        if (value !== undefined) {
            quotation.value = value;
        }
        if (message !== undefined) {
            quotation.message = message;
        }
        return this.quotationsRepository.save(quotation);
    }
    async remove(id) {
        console.log(`[QuotationsService] Iniciando remoção de cotação ID: ${id}`);
        try {
            const quotation = await this.quotationsRepository.findOne({
                where: { id },
            });
            if (!quotation) {
                console.log(`[QuotationsService] Cotação não encontrada: ${id}`);
                throw new common_1.NotFoundException(`Cotação com ID ${id} não encontrada`);
            }
            console.log(`[QuotationsService] Cotação encontrada: ${id}, status: ${quotation.status}`);
            const deleteResult = await this.quotationsRepository
                .createQueryBuilder()
                .delete()
                .from(quotation_entity_1.Quotation)
                .where("id = :id", { id })
                .execute();
            console.log(`[QuotationsService] Resultado da exclusão:`, deleteResult);
            if (deleteResult.affected === 0) {
                console.log(`[QuotationsService] Nenhum registro afetado ao excluir cotação: ${id}`);
                throw new Error(`Falha ao excluir cotação: nenhum registro foi afetado`);
            }
            console.log(`[QuotationsService] Cotação excluída com sucesso: ${id}`);
            return {
                success: true,
                message: `Cotação ${id} excluída com sucesso`
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error(`[QuotationsService] Erro ao excluir cotação ${id}:`, error);
            throw new Error(`Erro ao excluir cotação: ${error.message}`);
        }
    }
    async getStats() {
        const total = await this.quotationsRepository.count();
        const pending = await this.quotationsRepository.count({
            where: { status: 'pending' },
        });
        const approved = await this.quotationsRepository.count({
            where: { status: 'approved' },
        });
        const rejected = await this.quotationsRepository.count({
            where: { status: 'rejected' },
        });
        const completed = await this.quotationsRepository.count({
            where: { status: 'completed' },
        });
        const cancelled = await this.quotationsRepository.count({
            where: { status: 'cancelled' },
        });
        return {
            total,
            pending,
            approved,
            rejected,
            completed,
            cancelled,
        };
    }
};
exports.QuotationsService = QuotationsService;
exports.QuotationsService = QuotationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quotation_entity_1.Quotation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QuotationsService);
//# sourceMappingURL=quotations.service.js.map