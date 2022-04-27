var app = new function () {

  this.el = document.getElementById('users');

  this.users = [];

  this.Count = function (data) {
    var el = document.getElementById('counter');
    var name = 'user';

    if (data) {
      if (data > 1) {
        name = 'users';
      }
      el.innerHTML = data + ' ' + name;
    } else {
      el.innerHTML = 'No ' + name;
    }
  };


  this.FetchAll = function () {
    var data = '';
    let self = this;

    axios.get(backendUrl + '/avatar/admin/users').then(function (response) {

      self.users = response.data;

      if (self.users.length > 0) {
        for (i = 0; i < self.users.length; i++) {
          data += '<tr>';
          data += '<td>' + self.users[i].email + '</td>';
          data += '<td><button onclick="app.Edit(' + self.users[i].id + ')">Edit</button></td>';
          data += '<td><button onclick="app.Delete(' + self.users[i].id + ')">Delete</button></td>';
          data += '</tr>';
        }
      }

      self.Count(self.users.length);
      return self.el.innerHTML = data;

    })

      .catch(function (error) {
        console.log(error);
        if (error.response) {
          alert(error.response.data.details);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

  };

  this.Add = function () {
    el = document.getElementById('add-name');

    var user = el.value;

    if (user) {

      this.users.push(user.trim());

      el.value = '';

      this.FetchAll();
    }
  };

  this.Edit = function (id) {
    var el = document.getElementById('edit-name');

    el.value = this.users[id].firstName;

    document.getElementById('spoiler').style.display = 'block';
    self = this;

    document.getElementById('saveEdit').onsubmit = function () {

      var user = el.value;

      if (user) {

        self.users.splice(item, 1, user.trim());

        self.FetchAll();

        CloseInput();
      }
    }
  };

  this.Delete = function (item) {

    this.users.splice(item, 1);

    this.FetchAll();
  };

}

app.FetchAll();

function CloseInput() {
  document.getElementById('spoiler').style.display = 'none';
}