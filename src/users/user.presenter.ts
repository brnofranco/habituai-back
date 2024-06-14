import { User } from '@prisma/client';

export class UsersPresenter {
	constructor(readonly user: User) {}

	toJSON() {
		return {
			id: this.user.id,
			email: this.user.email,
			name: this.user.name,
			experience: this.user.experience,
			avatarId: this.user.avatarId,
		};
	}
}
