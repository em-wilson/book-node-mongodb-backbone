var hasContact = function(account, contactId) {
  if ( null == account.contacts ) return false;

  account.contacts.forEach(function(contact) {
    if ( contact.accountId == contactId ) {
      return true;
    }
  });
  return false;
};