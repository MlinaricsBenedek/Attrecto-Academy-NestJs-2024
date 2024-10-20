import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";
import { TokenPayload } from "../interfaces/token-payload.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy, 'token') {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        })
    }


    validate(payload: TokenPayload) {
        return payload.sub ? this.userService.findOne(payload.sub) : null
    }
}