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
exports.DepositsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const deposit_entity_1 = require("../entities/deposit.entity");
let DepositsService = class DepositsService {
    constructor(depositRepository) {
        this.depositRepository = depositRepository;
    }
    async create(createDepositDto) {
        const deposit = this.depositRepository.create(createDepositDto);
        return this.depositRepository.save(deposit);
    }
    async findAll() {
        return this.depositRepository.find();
    }
    async findOne(id) {
        const deposit = await this.depositRepository.findOne({ where: { id } });
        if (!deposit)
            throw new common_1.NotFoundException('Depósito não encontrado');
        return deposit;
    }
    async update(id, updateDepositDto) {
        const deposit = await this.findOne(id);
        Object.assign(deposit, updateDepositDto);
        return this.depositRepository.save(deposit);
    }
    async remove(id) {
        const result = await this.depositRepository.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('Depósito não encontrado');
    }
};
exports.DepositsService = DepositsService;
exports.DepositsService = DepositsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(deposit_entity_1.Deposit)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepositsService);
//# sourceMappingURL=deposits.service.js.map