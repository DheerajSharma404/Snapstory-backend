import { User } from "../models/index.js";
import CrudRepository from "./crud.respository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findBy(data) {
    const response = await User.findOne(data);
    return response;
  }
}

export default UserRepository;
