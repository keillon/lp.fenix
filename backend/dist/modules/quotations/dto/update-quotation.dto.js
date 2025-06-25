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
exports.UpdateQuotationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_quotation_dto_1 = require("./create-quotation.dto");
class UpdateQuotationDto {
}
exports.UpdateQuotationDto = UpdateQuotationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cidade de origem', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "originCity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estado de origem', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "originState", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cidade de destino', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "destinationCity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estado de destino', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "destinationState", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Peso da carga', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "cargoWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indica se a carga está paletizada', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "palletized", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantidade de paletes (se aplicável)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "palletQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Volumes da carga', type: [create_quotation_dto_1.VolumeDto], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_quotation_dto_1.VolumeDto),
    __metadata("design:type", Array)
], UpdateQuotationDto.prototype, "volumes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Volume total', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateQuotationDto.prototype, "totalVolume", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome completo do solicitante', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email do solicitante', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Telefone do solicitante', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'CNPJ da empresa', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "cnpj", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status da cotação', required: false, enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['pending', 'approved', 'rejected', 'completed', 'cancelled']),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Valor da cotação', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mensagem/observação', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuotationDto.prototype, "message", void 0);
//# sourceMappingURL=update-quotation.dto.js.map