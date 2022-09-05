import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-saml';
import { UsersService } from '../users/users.service';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    /*const loginHandler = async (profile: any, done: any): Promise<void> => {
      const user = await userService.findOne(profile.nameID);

      if (user) {
        done(null, user);
      } else {
        done('invalid user');
      }
    };

     const logoutHandler = async (profile: any, done: any): Promise<void> => {
      const user = await userService.findOne(profile.nameID);

      if (user) {
        done(null, user);
      } else {
        done('invalid user');
      }
    }; */

    super(
      {
        path: 'auth/saml/ac',
        cert: 'MIICmzCCAYMCBgGC6wTaDTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZtYXN0ZXIwHhcNMjIwODI5MTkxMDM5WhcNMzIwODI5MTkxMjE5WjARMQ8wDQYDVQQDDAZtYXN0ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8VzmUTQjXyM2I5Yma7VTV1zw7i3RxC9Z/To9C7L5C/OLzLIqZvziE1PzetIK9TV8ParDeIrtnvUC33lNyIspbBug3E0uRsmky+M/JdyL2s7fGVDnLX2V3AakJrX699HVrahdV+4c3HV+YeLSolay4bCJn3HRL+maYCMbMz5XzOdv6rdn655vRtUj1hcjOcEDYbg7jfEKQSnm/mgqeF+7NTqoMCuHYjp+iH9QI2QoKrfVcjYUc3np4zxSLTlVrr152jvWaUcTAwTDYvKpkrRKW1JsxEAF3Aj5OeVMgclM0cAzjg3aNFQtNn15szrydxZZnxdr7xgC9xX1kod5KIt0LAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAFlKW+GfBh+cGFtrbhmgLUVJhjd6jdCSse9dZMKF2YQqm0btL6TpBI+yriCDACU9LnAC411KQa9VWeKpOfkqjrQYFaHHdojVB8AJ+Qg1ObrRR+TRSvXbHHMCZWT638p5uXG1IHsGdIPgSJuNJ+vLoFh4Ou1RdFGXnWrBDs/wT6NXXV3zRnqYcYVDTV+cI+j9rSKqL+RrW14D4SX1SPc80j6gxuPWC+o/Z36kFw99sjOlxNB+BHky7SP/RnVLXQdVqwecctiHgGjC22dyUCoRmnLgLhP84SPs7l7lzgfB4zmWb7Dn6GsQZSlvLueAy12tKKhgEdvkmnLOXFc/UTyucyI=',
        entryPoint: 'http://localhost:8080/realms/master/protocol/saml',
        issuer: 'nestjs-client',
        identifierFormat: null,
        authnContext: [],
      },
      //loginHandler,
      //logoutHandler,
    );
  }

  async validate(profile: any) {
    const user = await this.userService.findOneByUsername(profile.nameID);

    if (!user) {
      throw new UnauthorizedException(
        {
          message: `user ${profile.nameID} not found`,
        },
        'Unauthorized access',
      );
    }

    return user;
  }
}
