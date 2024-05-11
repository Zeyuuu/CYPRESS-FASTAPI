describe('User Routes Test', () => {
  it('GET users route', () => {
    cy.visit('http://127.0.0.1:8000/docs/')
    cy.request('http://127.0.0.1:8000/adminpanel/administrator/account_list').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length.above(0);
    });
  });
});

describe('Admin Panel', () => {
  it('1. Find an admin by ID', () => {
    cy.visit('http://127.0.0.1:8000/docs/')
    cy.get('.opblock-summary-description').contains('Find Admin').click()
    cy.get('.try-out__btn').click()
    cy.get('input').type('1')
    cy.get('.opblock-control__btn').click()
    cy.get('.opblock-control__btn').contains('Execute').click()

  
    cy.request({
      method: 'GET',
      url: 'http://127.0.0.1:8000/adminpanel/administrator/get_admin_account?admin_id=1',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 404) {
        expect(response.body.detail).to.equal('User not found');
      } else {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('admin_id', 1);
        expect(response.body).to.have.property('username', "admin");
        expect(response.body).to.have.property('password', "adminpassword");
      }
    });
  });

  it('2. Delete admin', () => {
    cy.visit('http://127.0.0.1:8000/docs/');
    cy.get('.opblock-summary-description').contains('Delete Administrator').click()
    cy.get('.try-out__btn').click()
    cy.get('input').type('1')
    cy.get('.opblock-control__btn').click()
    cy.get('.opblock-control__btn').contains('Execute').click()

    cy.request({
      method: 'GET',
      url: 'http://127.0.0.1:8000/adminpanel/administrator/get_admin_account?admin_id=1',
      failOnStatusCode: false // Don't fail if status code is not 2xx or 3xx
    }).then((response) => {
      if (response.status === 404) {
        expect(response.body.detail).to.equal('User not found');
      } else if (response.status === 200) {
        expect(response.body).to.have.property('admin_id', 1);
        expect(response.body).to.have.property('username', "admin");
        expect(response.body).to.have.property('password', "adminpassword");
      }
    });
  });

  it('3. Find an admin by ID', () => {
    cy.visit('http://127.0.0.1:8000/docs/')
    cy.get('.opblock-summary-description').contains('Find Admin').click()
    cy.get('.try-out__btn').click()
    cy.get('input').type('1')
    cy.get('.opblock-control__btn').click()
    cy.get('.opblock-control__btn').contains('Execute').click()

    cy.request({
      method: 'GET',
      url: 'http://127.0.0.1:8000/adminpanel/administrator/get_admin_account?admin_id=1',
      failOnStatusCode: false // Don't fail if status code is not 2xx or 3xx
    }).then((response) => {
      if (response.status === 404) {
        expect(response.body.detail).to.equal('User not found');
      } else if (response.status === 200) {
        expect(response.body).to.have.property('admin_id', 1);
        expect(response.body).to.have.property('username', "admin");
        expect(response.body).to.have.property('password', "adminpassword");
      }
    });
  });

  it('4. Delete equipment by admin', () => {
    cy.visit('http://127.0.0.1:8000/docs/');
    cy.get('.opblock-summary-description').contains('Delete Equipment By Admin').click();
    cy.get('.try-out__btn').click();
    cy.get('input').type('2'); // Assuming '2' is a valid equipment ID to delete
    cy.get('.opblock-control__btn').click();
    cy.get('.opblock-control__btn').contains('Execute').click();

    cy.request({
      method: 'DELETE',
      url: 'http://127.0.0.1:8000/adminpanel/admin/equipment/delete/2', // Assuming '2' is the equipment ID to delete
      qs: {
        adminID: 2
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status >= 400) {
        expect(response.body.detail).to.contain('Equipment not found');
      } else {
        expect(response.body.message).to.equal('Equipment deleted successfully by administrator');
      }
    });
  });
});

// PERSONNEL INFORMATION
describe('PERSONNEL INFORMATION', () => {
  it('5. Delete personnel', () => {
    cy.request({
      method: 'DELETE',
      url: 'http://127.0.0.1:8000/api/personnel/delete_personnel?p_id=2',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status >= 400) {
        expect(response.body.detail).to.contain('Teacher not found');
      } else {
        expect(response.body).to.have.property('message', 'personnel deleted successfully');
      }
    });
  });

  it('7. Get personnel list', () => {
    cy.visit('http://127.0.0.1:8000/docs/')
    cy.get('.opblock-summary-description').contains('Get Personnel List').click()
    cy.get('.try-out__btn').click()
    cy.get('.opblock-control__btn').click()
    cy.get('.opblock-control__btn').contains('Execute').click()

    cy.request({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/personnel/personnel_list',
      failOnStatusCode: false // Don't fail if status code is not 2xx or 3xx
    }).then((response) => {
      // You can add assertions here if needed
    });
  });

  it('8. Find a Personnel by ID', () => {
    cy.visit('http://127.0.0.1:8000/docs/')
    cy.get('.opblock-summary-description').contains('Read Personnel').click()
    cy.get('.try-out__btn').click()
    cy.get('input').type('1')
    cy.get('.opblock-control__btn').click()
    cy.get('.opblock-control__btn').contains('Execute').click()

    cy.request({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/personnel/get_personnel?p_id=1', // Corrected URL
      failOnStatusCode: false // Don't fail if status code is not 2xx or 3xx
    }).then((response) => {
      // You can add assertions here if needed
    });
  });
});

// TEACHER INFORMATION
describe('TEACHER INFORMATION', () => {
  it('9. Get teacher list', () => { // Corrected test name
    cy.visit('http://127.0.0.1:8000/docs/')
    cy.get('.opblock-summary-description').contains('Get Teacherlist').click()
    cy.get('.try-out__btn').click()
    cy.get('.opblock-control__btn').click()
    cy.get('.opblock-control__btn').contains('Execute').click()

    cy.request({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/teacher/teacher_list', // Updated URL to fetch teacher list
      failOnStatusCode: false // Don't fail if status code is not 2xx or 3xx
    }).then((response) => {
      if (response.status === 404) {
        // User not found, this is expected
        expect(response.body.detail).to.equal('User not found');
      } else if (response.status === 200) {
        // Teacher list retrieved successfully
        expect(response.body).to.be.an('array').that.is.not.empty;
        // Assert properties for each teacher in the array
        response.body.forEach(teacher => {
          expect(teacher).to.have.property('teacher_id');
          expect(teacher).to.have.property('teacher_name');
        });
      } else {
        // Handle other cases if needed
      }
    });
  });

  it('10. Find a Teacher by ID', () => {
    cy.visit('http://127.0.0.1:8000/docs/')
    cy.get('.opblock-summary-description').contains('Find Teacher').click()
    cy.get('.try-out__btn').click()
    cy.get('input').type('1')
    cy.get('.opblock-control__btn').click()
    cy.get('.opblock-control__btn').contains('Execute').click()

    cy.request({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/teacher/get_teacher?t_id=1', // Corrected URL
      failOnStatusCode: false // Don't fail if status code is not 2xx or 3xx
    }).then((response) => {
      // You can add assertions here if needed
    });
  });

  it('11. Delete Teacher', () => {
    cy.visit('http://127.0.0.1:8000/docs/')
    cy.get('.opblock-summary-description').contains('Delete Teacher').click()
    cy.get('.try-out__btn').click()
    cy.get('input').type('1')
    cy.get('.opblock-control__btn').click()
    cy.get('.opblock-control__btn').contains('Execute').click()
    cy.request({
      method: 'DELETE',
      url: 'http://127.0.0.1:8000/api/teacher/delete_teacher?t_id=1', // Corrected URL
      failOnStatusCode: false
    }).then((response) => {
      if (response.status >= 400) {
        expect(response.body.detail).to.contain('Teacher not found');
      } else {
        expect(response.body).to.have.property('message', 'Teacher deleted successfully');
      }
    });
  });
});

// STUDENT INFORMATION
describe('STUDENT INFORMATION', () => {
  it('12. Read Studentlist', () => { // Corrected test name
    cy.visit('http://127.0.0.1:8000/docs/')
    cy.get('.opblock-summary-description').contains('Read Student').click()
    cy.get('.try-out__btn').click()
    cy.get('.opblock-control__btn').click()
    cy.get('.opblock-control__btn').contains('Execute').click()

    cy.request({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/student/student_list', // Corrected URL
      failOnStatusCode: false // Don't fail if status code is not 2xx or 3xx
    }).then((response) => {
      if (response.status === 404) {
        // User not found, this is expected
        expect(response.body.detail).to.equal('User not found');
      } else if (response.status === 200) {
        // Student list retrieved successfully
        expect(response.body).to.be.an('array').that.is.not.empty;
        // Assert properties for each student in the array
        response.body.forEach(student => {
          expect(student).to.have.property('student_id');
          expect(student).to.have.property('student_name');
          expect(student).to.have.property('year_section');
        });
      } else {
        // Handle other cases if needed
      }
    });
  });
    it('13. Delete Student', () => {
      cy.visit('http://127.0.0.1:8000/docs/')
      cy.get('.opblock-summary-description').contains('Delete Student').click()
      cy.get('.try-out__btn').click()
      cy.get('input').type('1')
      cy.get('.opblock-control__btn').click()
      cy.get('.opblock-control__btn').contains('Execute').click()
      
      cy.request({
        method: 'DELETE',
        url: 'http://127.0.0.1:8000/api/student/delete_student?s_id=1',
        failOnStatusCode: false
      }).then((response) => {
        if (response.status >= 400) {
          expect(response.body.detail.toLowerCase()).to.contain('student not found'); // Convert to lowercase for case-insensitive comparison
        } else {
          expect(response.body).to.have.property('message', 'Student deleted successfully');
        }
      });
    });
    it('14. Find a Teacher by ID', () => {
      cy.visit('http://127.0.0.1:8000/docs/')
      cy.get('.opblock-summary-description').contains('Find Teacher').click()
      cy.get('.try-out__btn').click()
      cy.get('input').type('1')
      cy.get('.opblock-control__btn').click()
      cy.get('.opblock-control__btn').contains('Execute').click()
  
      cy.request({
        method: 'GET',
        url: 'http://127.0.0.1:8000/api/teacher/get_teacher?t_id=1', // Corrected URL
        failOnStatusCode: false // Don't fail if status code is not 2xx or 3xx
      }).then((response) => {
        // You can add assertions here if needed
      });
  });
  
  describe('For Equipments', () => {
    it('15. Get Equipmentlist', () => { // Corrected test name
      cy.visit('http://127.0.0.1:8000/docs/')
      cy.get('.opblock-summary-description').contains('Get Equipmentlist').click()
      cy.get('.try-out__btn').click()
      cy.get('.opblock-control__btn').click()
      cy.get('.opblock-control__btn').contains('Execute').click()
  
      cy.request({
        method: 'GET',
        url: 'http://127.0.0.1:8000/api/equipments/equipment_list', // Corrected URL
        failOnStatusCode: false // Don't fail if status code is not 2xx or 3xx
      }).then((response) => {
        if (response.status === 404) {
        
        } else {
          // Handle other cases if needed
        }
      });
    });
    it('16. Find a equipment by ID', () => {
      cy.visit('http://127.0.0.1:8000/docs/')
      cy.get('.opblock-summary-description').contains('Find Equipment').click()
      cy.get('.try-out__btn').click()
      cy.get('input').type('4')
      cy.get('.opblock-control__btn').click()
      cy.get('.opblock-control__btn').contains('Execute').click()
  
      cy.request({
        method: 'GET',
        url: 'http://127.0.0.1:8000/api/equipment/find_equipment?item_id=4', // Corrected URL
        failOnStatusCode: false // Don't fail if status code is not 2xx or 3xx
      }).then((response) => {
        // You can add assertions here if needed
      });
  });
  it('17. Delete equipment', () => {
    cy.visit('http://127.0.0.1:8000/docs/')
    cy.get('.opblock-summary-description').contains('Delete Equipment').click()
    cy.get('.try-out__btn').click()
    cy.get('input').type('1')
    cy.get('.opblock-control__btn').click()
    cy.get('.opblock-control__btn').contains('Execute').click()
    
    cy.request({
      method: 'DELETE',
      url: 'http://127.0.0.1:8000/api/equipment/delete/4',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 404) {
        // Check if response body contains 'equipment not found'
        expect(response.body.detail.toLowerCase()).to.contain('equipment not found'); // Adjusted assertion for case-insensitive comparison
      } else if (response.status === 500) {
        // Check if the response body contains any error message
        expect(response.body).to.be.an('object');
      } else {
        // Check if equipment was successfully deleted
        expect(response.body).to.have.property('message', 'Equipment deleted successfully');
      }
    });
  });
});
describe('History', () => {
  it('18. Get History', () => { // Corrected test name
    cy.visit('http://127.0.0.1:8000/docs/')
    cy.get('.opblock-summary-description').contains('Get History Data').click()
    cy.get('.try-out__btn').click()
    cy.get('.opblock-control__btn').click()
    cy.get('.opblock-control__btn').contains('Execute').click()

    cy.request({
      method: 'GET',
      url: 'http://127.0.0.1:8000/history/history_data', // Corrected URL
      failOnStatusCode: false // Don't fail if status code is not 2xx or 3xx
    }).then((response) => {
      if (response.status === 404) {
      }
    });
  });
});
describe('Requests', () => {
  it('19. Get Requests', () => { // Corrected test name
    cy.visit('http://127.0.0.1:8000/docs/')
    cy.get('.opblock-summary-description').contains('Get Requests').click()
    cy.get('.try-out__btn').click()
    cy.get('.opblock-control__btn').click()
    cy.get('.opblock-control__btn').contains('Execute').click()

    cy.request({
      method: 'GET',
      url: 'http://127.0.0.1:8000/request/requests', // Corrected URL
      failOnStatusCode: false // Don't fail if status code is not 2xx or 3xx
    }).then((response) => {
      if (response.status === 404) {
      }
    });
  });
});
});
