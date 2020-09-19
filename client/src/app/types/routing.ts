import { Resolve } from '@angular/router';

export type Resolver<T> = {
    [P in keyof T]: new (...args: unknown[]) => Resolve<T[P]>
}
