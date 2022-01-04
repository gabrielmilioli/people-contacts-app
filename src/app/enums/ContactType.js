export const ContactType = {
  PHONE: 1,
  EMAIL: 2,
  WHATSAPP: 3
}

export const getDescription = (contactType) => {
  contactType = Number.parseInt(contactType);
  switch (contactType) {
    case ContactType.PHONE:
      return 'Phone';

    case ContactType.EMAIL:
      return 'Email';

    case ContactType.WHATSAPP:
      return 'WhatsApp';

    default:
      break;
  }
}