import ApiService from './ApiService';

class PersonService extends ApiService {

  constructor() {
    super('person');
  }

  save(params) {
    if (params.id) {
      return this.put(params.id, params);
    }
    return this.post('', params);
  }

  find() {
    return this.get('');
  }

  one(id) {
    return this.getById(id);
  }

  remove(id) {
    return this.delete(id);
  }

};

export default PersonService;