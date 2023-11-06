import bcrypt from 'bcrypt';

const passwordsCrypt = {
  encrypt: async (password) => {
    try {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (err) {
      throw err;
    }
  },
  compare: async (password1, password2) => {
    try{
        const hash = await bcrypt.compare(password1, password2);
        return hash;
    } catch(err){
        throw err;
    }
  }
};

export default passwordsCrypt;
