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
exports.AdminQuotationsController = void 0;
const common_1 = require("@nestjs/common");
const quotations_service_1 = require("../services/quotations.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let AdminQuotationsController = class AdminQuotationsController {
    constructor(quotationsService) {
        this.quotationsService = quotationsService;
    }
    findAll() {
        return this.quotationsService.findAll();
    }
};
exports.AdminQuotationsController = AdminQuotationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas as cotações (admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cotações listadas com sucesso' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminQuotationsController.prototype, "findAll", null);
exports.AdminQuotationsController = AdminQuotationsController = __decorate([
    (0, swagger_1.ApiTags)('Admin Quotations'),
    (0, common_1.Controller)('admin/quotations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [quotations_service_1.QuotationsService])
], AdminQuotationsController);
//# sourceMappingURL=admin-quotations.controller.js.map