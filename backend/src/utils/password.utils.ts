import * as bcrypt from 'bcrypt';

export class PasswordUtils {
  /**
   * Check if pepper is available, throw error if not
   */
  private static getPepper(): string {
    const pepper = process.env.PEPPER;
    if (!pepper) {
      throw new Error(
        'PEPPER environment variable is required for password operations',
      );
    }
    return pepper;
  }

  /**
   * Hash a password with salt and pepper
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '3', 10);
    const pepper = this.getPepper();

    const pepperedPassword = password + pepper;

    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(pepperedPassword, salt);
  }

  /**
   * Compare a plain password with a hashed password
   */
  static async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const pepper = this.getPepper();
    const pepperedPassword = plainPassword + pepper;

    return await bcrypt.compare(pepperedPassword, hashedPassword);
  }
}
