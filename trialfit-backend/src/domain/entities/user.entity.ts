export enum UserRole {
  SEEKER = "SEEKER",
  BUDDY = "BUDDY",
  ADMIN = "ADMIN"
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  public static create(props: Omit<UserProps, "createdAt">): User {
    return new User({
      ...props,
      createdAt: new Date()
    });
  }

  public static reconstitute(props: UserProps): User {
    return new User(props);
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get role(): UserRole {
    return this.props.role;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public isBuddy(): boolean {
    return this.props.role === UserRole.BUDDY;
  }

  public isSeeker(): boolean {
    return this.props.role === UserRole.SEEKER;
  }

  public isAdmin(): boolean {
    return this.props.role === UserRole.ADMIN;
  }
}
