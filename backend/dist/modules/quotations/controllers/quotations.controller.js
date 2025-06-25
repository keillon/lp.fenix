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
exports.QuotationsController = void 0;
const common_1 = require("@nestjs/common");
const quotations_service_1 = require("../services/quotations.service");
const create_quotation_dto_1 = require("../dto/create-quotation.dto");
const update_quotation_dto_1 = require("../dto/update-quotation.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const roles_guard_1 = require("../../../common/guards/roles.guard");
let QuotationsController = class QuotationsController {
    constructor(quotationsService) {
        this.quotationsService = quotationsService;
    }
    create(createQuotationDto) {
        return this.quotationsService.create(createQuotationDto);
    }
    findAll(email) {
        return this.quotationsService.findAll(email);
    }
    getStats() {
        return this.quotationsService.getStats();
    }
    findOne(id) {
        return this.quotationsService.findOne(id);
    }
    update(id, updateQuotationDto) {
        return this.quotationsService.update(id, updateQuotationDto);
    }
    updateStatus(id, status, value, message) {
        return this.quotationsService.updateStatus(id, status, value, message);
    }
    remove(id) {
        console.log(`Solicitação de exclusão para cotação ID: ${id}`);
        return this.quotationsService.remove(id);
    }
    removeAlternative(id) {
        console.log(`Solicitação de exclusão alternativa para cotação ID: ${id}`);
        return this.quotationsService.remove(id);
    }
    publicRemove(id) {
        console.log(`============================================`);
        console.log(`[EMERGÊNCIA] EXCLUINDO COTAÇÃO SEM AUTENTICAÇÃO: ${id}`);
        console.log(`============================================`);
        try {
            const result = this.quotationsService.remove(id);
            console.log(`[EMERGÊNCIA] Cotação ${id} excluída com sucesso!`);
            return result;
        }
        catch (error) {
            console.error(`[EMERGÊNCIA] Erro ao excluir cotação ${id}:`, error.message);
            throw error;
        }
    }
};
exports.QuotationsController = QuotationsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar uma nova cotação' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Cotação criada com sucesso' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quotation_dto_1.CreateQuotationDto]),
    __metadata("design:returntype", void 0)
], QuotationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas as cotações' }),
    (0, swagger_1.ApiQuery)({ name: 'email', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de cotações' }),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuotationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obter estatísticas das cotações' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estatísticas obtidas com sucesso' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuotationsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter uma cotação pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cotação encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cotação não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuotationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar uma cotação' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cotação atualizada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cotação não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_quotation_dto_1.UpdateQuotationDto]),
    __metadata("design:returntype", void 0)
], QuotationsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar o status de uma cotação' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status atualizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cotação não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Body)('value')),
    __param(3, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], QuotationsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Remover uma cotação' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cotação removida com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cotação não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuotationsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('delete/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Remover uma cotação (método alternativo)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cotação removida com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cotação não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuotationsController.prototype, "removeAlternative", null);
__decorate([
    (0, common_1.Delete)('public-delete/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'EMERGÊNCIA: Remover uma cotação sem autenticação' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cotação removida com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cotação não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuotationsController.prototype, "publicRemove", null);
exports.QuotationsController = QuotationsController = __decorate([
    (0, swagger_1.ApiTags)('cotações'),
    (0, common_1.Controller)('quotations'),
    __metadata("design:paramtypes", [quotations_service_1.QuotationsService])
], QuotationsController);
//# sourceMappingURL=quotations.controller.js.map