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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getStats() {
        return this.dashboardService.getStats();
    }
    async getRepresentantesRecentes() {
        return this.dashboardService.getRepresentantesRecentes();
    }
    async getRepresentantesRecentesAlias() {
        return this.dashboardService.getRepresentantesRecentes();
    }
    async getCotacoesRecentes() {
        return this.dashboardService.getCotacoesRecentes();
    }
    async getNotifications() {
        return this.dashboardService.getNotifications?.() ?? [];
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter estatísticas gerais do dashboard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estatísticas retornadas com sucesso' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('representantes'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter representantes recentes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Representantes retornados com sucesso' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getRepresentantesRecentes", null);
__decorate([
    (0, common_1.Get)('representantes-recentes'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter representantes recentes (alias)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Representantes retornados com sucesso' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getRepresentantesRecentesAlias", null);
__decorate([
    (0, common_1.Get)('cotacoes'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter cotações recentes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cotações retornadas com sucesso' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getCotacoesRecentes", null);
__decorate([
    (0, common_1.Get)('notifications'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter notificações do admin' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notificações retornadas com sucesso' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getNotifications", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('Dashboard'),
    (0, common_1.Controller)('admin/dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map