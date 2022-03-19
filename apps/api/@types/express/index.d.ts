import type { UserDocument } from '../../src/models/User';

declare global {
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface User extends UserDocument {}

        export interface Request {
            user?: User;
        }
    }
}
