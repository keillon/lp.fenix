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
exports.Representative = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let Representative = class Representative {
};
exports.Representative = Representative;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID único do representante' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Representative.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome completo do representante' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Representative.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email do representante' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Representative.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Telefone do representante' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Representative.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'CPF ou CNPJ do representante' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Representative.prototype, "cpfCnpj", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cidade do representante' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Representative.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estado do representante' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Representative.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Experiência do representante', required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Representative.prototype, "experience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Área de cobertura', required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Representative.prototype, "coverageArea", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mensagem/observação', required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Representative.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status do representante' }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }),
    __metadata("design:type", String)
], Representative.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Representative.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data da última atualização' }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Representative.prototype, "updatedAt", void 0);
exports.Representative = Representative = __decorate([
    (0, typeorm_1.Entity)('representatives')
], Representative);
//# sourceMappingURL=representative.entity.js.map