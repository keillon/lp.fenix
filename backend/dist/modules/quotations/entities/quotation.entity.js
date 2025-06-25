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
exports.Quotation = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let Quotation = class Quotation {
};
exports.Quotation = Quotation;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID único da cotação' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Quotation.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cidade de origem' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quotation.prototype, "originCity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estado de origem' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quotation.prototype, "originState", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cidade de destino' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quotation.prototype, "destinationCity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estado de destino' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quotation.prototype, "destinationState", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Peso da carga' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quotation.prototype, "cargoWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indica se a carga está paletizada' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quotation.prototype, "palletized", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantidade de paletes (se aplicável)', required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Quotation.prototype, "palletQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Volumes da carga' }),
    (0, typeorm_1.Column)('jsonb', { nullable: false, default: () => "'[]'" }),
    __metadata("design:type", Array)
], Quotation.prototype, "volumes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Volume total' }),
    (0, typeorm_1.Column)('float', { nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Quotation.prototype, "totalVolume", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome completo do solicitante' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quotation.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email do solicitante' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quotation.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Telefone do solicitante' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quotation.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'CNPJ da empresa' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quotation.prototype, "cnpj", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status da cotação' }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
        default: 'pending'
    }),
    __metadata("design:type", String)
], Quotation.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Valor da cotação', required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Quotation.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mensagem/observação', required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Quotation.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Quotation.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data da última atualização' }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Quotation.prototype, "updatedAt", void 0);
exports.Quotation = Quotation = __decorate([
    (0, typeorm_1.Entity)('quotations')
], Quotation);
//# sourceMappingURL=quotation.entity.js.map