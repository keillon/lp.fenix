"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepresentativesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const representative_entity_1 = require("./entities/representative.entity");
const representatives_service_1 = require("./services/representatives.service");
const representatives_controller_1 = require("./controllers/representatives.controller");
let RepresentativesModule = class RepresentativesModule {
};
exports.RepresentativesModule = RepresentativesModule;
exports.RepresentativesModule = RepresentativesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([representative_entity_1.Representative]),
        ],
        controllers: [representatives_controller_1.RepresentativesController],
        providers: [representatives_service_1.RepresentativesService],
        exports: [representatives_service_1.RepresentativesService],
    })
], RepresentativesModule);
//# sourceMappingURL=representatives.module.js.map