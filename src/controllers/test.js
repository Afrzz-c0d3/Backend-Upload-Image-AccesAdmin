const testHash = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      console.log("Hashed Password:", hash);
    } catch (error) {
      console.error("Hashing Error:", error);
    }
  };
  
  testHash("examplepassword");