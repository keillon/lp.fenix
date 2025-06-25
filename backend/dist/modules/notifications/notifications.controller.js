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
var NotificationsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const roles_guard_1 = require("../../common/guards/roles.guard");
let NotificationsController = NotificationsController_1 = class NotificationsController {
    constructor() {
        this.logger = new common_1.Logger(NotificationsController_1.name);
        this.notifications = [];
        this.notifications = [
            {
                id: 'notif-1',
                type: 'representante',
                message: 'Novos representantes aguardando aprovação',
                createdAt: new Date().toISOString(),
                read: false
            },
            {
                id: 'notif-2',
                type: 'cotacao',
                message: 'Novas cotações recebidas',
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                read: true
            }
        ];
    }
    getAllNotifications() {
        this.logger.log('Obtendo todas as notificações administrativas');
        return this.notifications;
    }
    getNotificationById(id) {
        this.logger.log(`Obtendo notificação com ID: ${id}`);
        const notification = this.notifications.find(n => n.id === id);
        if (!notification) {
            return { success: false, message: 'Notificação não encontrada' };
        }
        return { success: true, data: notification };
    }
    createNotification(data) {
        this.logger.log('Criando nova notificação');
        const newNotification = {
            id: `notif-${Date.now()}`,
            type: data.type || 'general',
            message: data.message,
            createdAt: new Date().toISOString(),
            read: false
        };
        this.notifications.push(newNotification);
        return { success: true, data: newNotification };
    }
    markAsRead(id) {
        this.logger.log(`Marcando notificação como lida: ${id}`);
        const index = this.notifications.findIndex(n => n.id === id);
        if (index === -1) {
            return { success: false, message: 'Notificação não encontrada' };
        }
        this.notifications[index].read = true;
        return { success: true, data: this.notifications[index] };
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obter todas as notificações administrativas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de notificações' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "getAllNotifications", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obter uma notificação específica pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notificação encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notificação não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "getNotificationById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar uma nova notificação' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Notificação criada com sucesso' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "createNotification", null);
__decorate([
    (0, common_1.Post)(':id/read'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Marcar uma notificação como lida' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notificação marcada como lida' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notificação não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "markAsRead", null);
exports.NotificationsController = NotificationsController = NotificationsController_1 = __decorate([
    (0, swagger_1.ApiTags)('notifications'),
    (0, common_1.Controller)('admin/notifications'),
    __metadata("design:paramtypes", [])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map