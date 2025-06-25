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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../../users/services/users.service");
const customExtractor = (req) => {
    let token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!token && req.cookies) {
        token = req.cookies.adminToken;
        console.log('[JwtStrategy] Token extraído do cookie:', token ? 'Encontrado' : 'Não encontrado');
    }
    if (!token && req.headers['x-auth-token']) {
        token = req.headers['x-auth-token'];
        console.log('[JwtStrategy] Token extraído do cabeçalho x-auth-token:', token ? 'Encontrado' : 'Não encontrado');
    }
    console.log('[JwtStrategy] Token final:', token ? `${token.substring(0, 10)}...` : 'Não encontrado');
    return token;
};
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, usersService) {
        super({
            jwtFromRequest: customExtractor,
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET', 'br9x7supERseCr3tKey2024'),
        });
        this.configService = configService;
        this.usersService = usersService;
        console.log('[JwtStrategy] Inicializado com secret:', configService.get('JWT_SECRET') ? 'Configurado' : 'Usando padrão');
    }
    async validate(payload) {
        try {
            console.log('[JwtStrategy] Validando payload:', { sub: payload.sub, email: payload.email });
            const user = await this.usersService.findOne(payload.sub);
            if (!user) {
                console.log('[JwtStrategy] Usuário não encontrado:', payload.sub);
                throw new common_1.UnauthorizedException('Usuário não encontrado');
            }
            if (!user.isActive) {
                console.log('[JwtStrategy] Usuário inativo:', payload.sub);
                throw new common_1.UnauthorizedException('Usuário inativo');
            }
            console.log('[JwtStrategy] Usuário validado com sucesso:', user.email);
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            };
        }
        catch (error) {
            console.error('[JwtStrategy] Erro na validação:', error.message);
            throw new common_1.UnauthorizedException('Token inválido');
        }
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map