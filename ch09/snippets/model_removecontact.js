var removeContact = function(account, contactId) {
  if ( null == account.contacts ) return;

  account.contacts.forEach(function(contact) {
    if ( contact.accountId == contactId ) {
      account.contacts.remove(contact);
    }
  });
  account.save();
};
