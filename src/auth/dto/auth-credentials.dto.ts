import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
export class AuthCredentialsDto {
    @IsString()
    @MinLength(5)
    @MaxLength(25)
    username: string;
    @IsString()
    @MinLength(8)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
            message: `Password too weak
        Password should contain Capital Letter Number and Special characters` },
    )
    password: string;
    fullname: string;
}
