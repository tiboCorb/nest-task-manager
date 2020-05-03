import { createParamDecorator } from '@nestjs/common';

import { User } from './user.entity';

const GetsUser = createParamDecorator((data, req): User => {
    return req.user;
});