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
exports.EmergencyController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quotation_entity_1 = require("./modules/quotations/entities/quotation.entity");
let EmergencyController = class EmergencyController {
    constructor(quotationsRepository) {
        this.quotationsRepository = quotationsRepository;
    }
    async deleteQuotation(id) {
        console.log(`
    ================================================
    EMERGÊNCIA: EXCLUINDO COTAÇÃO ${id} DIRETAMENTE!
    ================================================
    `);
        try {
            const quotation = await this.quotationsRepository.findOne({
                where: { id },
            });
            if (!quotation) {
                console.log(`[EMERGÊNCIA] Cotação ${id} não encontrada!`);
                return { success: false, message: 'Cotação não encontrada' };
            }
            const result = await this.quotationsRepository
                .createQueryBuilder()
                .delete()
                .from(quotation_entity_1.Quotation)
                .where("id = :id", { id })
                .execute();
            console.log(`[EMERGÊNCIA] Resultado da exclusão:`, result);
            if (result.affected === 0) {
                console.log(`[EMERGÊNCIA] Nenhum registro afetado!`);
                return { success: false, message: 'Nenhum registro foi afetado' };
            }
            console.log(`[EMERGÊNCIA] Cotação ${id} excluída com sucesso!`);
            return { success: true, message: `Cotação ${id} excluída com sucesso!` };
        }
        catch (error) {
            console.error(`[EMERGÊNCIA] Erro ao excluir cotação ${id}:`, error);
            return { success: false, message: `Erro: ${error.message}` };
        }
    }
    async forceDeleteQuotation(id) {
        console.log(`
    ================================================
    EMERGÊNCIA: FORÇA BRUTA PARA EXCLUIR COTAÇÃO ${id}!
    ================================================
    `);
        try {
            console.log(`[EMERGÊNCIA] Buscando cotação ${id}`);
            const quotation = await this.quotationsRepository.findOne({
                where: { id },
            });
            console.log(`[EMERGÊNCIA] Resultado da busca:`, quotation ? 'Cotação encontrada' : 'Cotação não encontrada');
            console.log(`[EMERGÊNCIA] Executando exclusão direta via queryBuilder`);
            const deleteResult = await this.quotationsRepository
                .createQueryBuilder()
                .delete()
                .from(quotation_entity_1.Quotation)
                .where("id = :id", { id })
                .execute();
            console.log(`[EMERGÊNCIA] Resultado da exclusão:`, deleteResult);
            const success = deleteResult.affected > 0 || !quotation;
            return {
                success: success,
                message: success ?
                    `Cotação ${id} removida com sucesso` :
                    `Falha na remoção da cotação ${id}`,
                details: deleteResult
            };
        }
        catch (error) {
            console.error(`[EMERGÊNCIA] Erro fatal ao excluir cotação ${id}:`, error);
            return {
                success: false,
                message: `Erro ao excluir cotação: ${error.message}`,
                stack: error.stack,
                error: error.toString()
            };
        }
    }
};
exports.EmergencyController = EmergencyController;
__decorate([
    (0, common_1.Delete)('delete-quotation/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmergencyController.prototype, "deleteQuotation", null);
__decorate([
    (0, common_1.Post)('force-delete-quotation/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmergencyController.prototype, "forceDeleteQuotation", null);
exports.EmergencyController = EmergencyController = __decorate([
    (0, common_1.Controller)('emergency'),
    __param(0, (0, typeorm_1.InjectRepository)(quotation_entity_1.Quotation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmergencyController);
//# sourceMappingURL=emergency.controller.js.map