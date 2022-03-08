import jwt from "jsonwebtoken";

export const generateJWT = (uid = "") => {
  return new Promise<string>((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.SECRETORPRIVATEKEY!,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("Could not generate JWT");
        } else {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          resolve(token!);
        }
      }
    );
  });
};
