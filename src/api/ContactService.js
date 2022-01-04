import ApiService from './ApiService';

class ContactService extends ApiService {

  constructor() {
    super('contact');
  }

  save(params) {
    if (params.id) {
      return this.put(params.id, params);
    }
    return this.post('', params);
  }

  findByPersonId(id) {
    return this.get('person/' + id);
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

export default ContactService;