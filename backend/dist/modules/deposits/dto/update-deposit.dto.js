"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDepositDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_deposit_dto_1 = require("./create-deposit.dto");
class UpdateDepositDto extends (0, mapped_types_1.PartialType)(create_deposit_dto_1.CreateDepositDto) {
}
exports.UpdateDepositDto = UpdateDepositDto;
//# sourceMappingURL=update-deposit.dto.js.map