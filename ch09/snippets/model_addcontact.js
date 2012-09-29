var addContact = function(account, addcontact) {
  contact = {
    name: addcontact.name,
    accountId: addcontact._id,
    added: new Date(),
    updated: new Date()
  };
  account.contacts.push(contact);

  account.save(function (err) {
    if (err) {
      console.log('Error saving account: ' + err);
    }
  });
};