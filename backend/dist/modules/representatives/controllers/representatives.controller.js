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
var RepresentativesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepresentativesController = void 0;
const common_1 = require("@nestjs/common");
const representatives_service_1 = require("../services/representatives.service");
const create_representative_dto_1 = require("../dto/create-representative.dto");
const update_representative_dto_1 = require("../dto/update-representative.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const roles_guard_1 = require("../../../common/guards/roles.guard");
let RepresentativesController = RepresentativesController_1 = class RepresentativesController {
    constructor(representativesService) {
        this.representativesService = representativesService;
        this.logger = new common_1.Logger(RepresentativesController_1.name);
    }
    create(createRepresentativeDto) {
        this.logger.log(`Criando novo representante: ${JSON.stringify(createRepresentativeDto)}`);
        return this.representativesService.create(createRepresentativeDto);
    }
    async findAll(search, status, skip, take) {
        this.logger.log(`Listando representantes: search=${search}, status=${status}, skip=${skip}, take=${take}`);
        const reps = await this.representativesService.findAll(search, status, skip ? parseInt(skip) : 0, take ? parseInt(take) : 20);
        this.logger.log(`Encontrados ${reps.length} representantes`);
        return { success: true, data: reps };
    }
    getStats() {
        this.logger.log('Obtendo estatísticas de representantes');
        return this.representativesService.getStats();
    }
    findOne(id) {
        this.logger.log(`Buscando representante com ID: ${id}`);
        return this.representativesService.findOne(id);
    }
    update(id, updateRepresentativeDto) {
        this.logger.log(`Atualizando representante ${id}: ${JSON.stringify(updateRepresentativeDto)}`);
        return this.representativesService.update(id, updateRepresentativeDto);
    }
    updateStatus(id, status, message) {
        this.logger.log(`Atualizando status do representante ${id} para ${status}${message ? ` com mensagem: ${message}` : ''}`);
        try {
            return this.representativesService.updateStatus(id, status, message);
        }
        catch (error) {
            this.logger.error(`Erro ao atualizar status do representante ${id}`, error.stack);
            throw error;
        }
    }
    remove(id) {
        this.logger.log(`Removendo representante com ID: ${id}`);
        return this.representativesService.remove(id);
    }
};
exports.RepresentativesController = RepresentativesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo representante' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Representante criado com sucesso' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_representative_dto_1.CreateRepresentativeDto]),
    __metadata("design:returntype", void 0)
], RepresentativesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os representantes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de representantes' }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('skip')),
    __param(3, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], RepresentativesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obter estatísticas dos representantes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estatísticas obtidas com sucesso' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RepresentativesController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obter um representante pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Representante encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Representante não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RepresentativesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar um representante' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Representante atualizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Representante não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_representative_dto_1.UpdateRepresentativeDto]),
    __metadata("design:returntype", void 0)
], RepresentativesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar o status de um representante' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status atualizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Representante não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], RepresentativesController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Remover um representante' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Representante removido com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Representante não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RepresentativesController.prototype, "remove", null);
exports.RepresentativesController = RepresentativesController = RepresentativesController_1 = __decorate([
    (0, swagger_1.ApiTags)('representantes'),
    (0, common_1.Controller)('representatives'),
    __metadata("design:paramtypes", [representatives_service_1.RepresentativesService])
], RepresentativesController);
//# sourceMappingURL=representatives.controller.js.map