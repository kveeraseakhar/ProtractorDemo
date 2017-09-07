describe("StartUp", function() {

	it('Open Norse Sample Application', function() {
		browser.driver.get('http://localhost:3000/#!/login');
		expect(browser.getCurrentUrl()).toContain('localhost:3000');
		browser.driver.sleep(3000);
		// Validating with Title
		expect(browser.driver.getTitle()).toEqual("Norse");
	});
});
describe('Login with Valid Credentials', function() {

	it('Enter UserName', function() {
		browser.driver.findElement(by.name('userName')).sendKeys('nani@gmail.com');
		expect(browser.driver.findElement(by.name('userName')).getAttribute('value')).toBe('nani@gmail.com');
	});

	it('Enter Password', function() {
		browser.driver.findElement(by.name('password')).sendKeys('12345');
		expect(browser.driver.findElement(by.name('password')).getAttribute('value')).toEqual('12345');
	});

	it('Click on [Login]', function() {
		expect(browser.driver.findElement(by.xpath("//button[@type='submit']")).isDisplayed());
		browser.driver.findElement(by.xpath("//button[@type='submit']")).click();
		expect(browser.driver.getTitle()).toEqual("Norse");
	});
});

describe('Patient Functionalities', function() {
	
	it('Click on Patient Menu', function() {
		browser.wait(element(by.xpath("//a[@ui-sref='main.patient']")).getWebElement());	
		expect(browser.driver.findElement(by.xpath("//a[@ui-sref='main.patient']")).isDisplayed());
		browser.driver.findElement(by.xpath("//a[@ui-sref='main.doctor']")).click();
	});	

	it('Click on [EditDoctor]', function() {		
		browser.wait(element(by.xpath("//a[@ui-sref='main.editPatient({id: item.id})']")).getWebElement());	
		expect(browser.driver.findElement(by.xpath("//a[@ui-sref='main.editPatient({id: item.id})']")).isDisplayed());
		browser.driver.findElement(by.xpath("//a[@ui-sref='main.editPatient({id: item.id})']")).click();
		browser.sleep(9000);
	});
});

describe('Edit Doctor Details', function() {

	it('Enter FirstName', function() {
		browser.driver.findElement(by.name("firstName")).clear();
		expect(browser.driver.findElement(by.name('firstName')).getAttribute('value').length).toEqual(0);
		browser.driver.findElement(by.name("firstName")).sendKeys("Madhu");
		expect(browser.driver.findElement(by.name('firstName')).getAttribute('value').length).not.toEqual(0);
	});

	it('Enter LastName', function() {	
		 browser.driver.findElement(by.name("lastName")).clear();
		 expect(browser.driver.findElement(by.name('lastName')).getAttribute('value').length).not.toEqual(0);
		 browser.driver.findElement(by.name("lastName")).sendKeys("Prasad");
		 expect(browser.driver.findElement(by.name('lastName')).getAttribute('value')).not.toBe('prasad.');
	});
	
	it('Enter Email ID', function() {
		expect(browser.driver.findElement(by.name('email')).getAttribute('value').length).not.toEqual(0);
		browser.driver.findElement(by.name("email")).clear();
		browser.driver.findElement(by.name("email")).sendKeys("lvprasad@gmail.com");
		expect(browser.driver.findElement(by.name('email')).getAttribute('value')).toContain('@');
	});
	
	it('Enter Phone Number', function() {
		browser.driver.findElement(by.name("phone")).clear();
		browser.driver.findElement(by.name("phone")).sendKeys("9988776655");
		expect(browser.driver.findElement(by.name('phone')).getAttribute('value').length).not.toEqual(0);
	});	
	
	it('Select Gender.', function() {
		//Gender
		browser.driver.findElement(by.xpath("//md-select")).click();
		//Option selection
		browser.driver.findElement(by.xpath("//md-option")).click();
		
	});
	
	it('Select Date.', function() {
		browser.wait(element(by.css(".md-datepicker-input.md-input")).getWebElement());	
		browser.driver.findElement(by.css(".md-datepicker-input.md-input")).clear();
		browser.driver.findElement(by.css(".md-datepicker-input.md-input")).sendKeys("08/08/2017");
	});
	
	it('Enter BloodGroup.', function() {
		browser.driver.findElement(by.name("bloodGroup")).clear();
		browser.driver.findElement(by.name("bloodGroup")).sendKeys("AB+");
		expect(browser.driver.findElement(by.name('bloodGroup')).getAttribute('value')).toBe('ab-');
	});	
	it('Enter Age.', function() {
		browser.driver.findElement(by.name("age")).clear();
		browser.driver.findElement(by.name("age")).sendKeys("30");
		expect(browser.driver.findElement(by.name('age')).getAttribute('value')).not.toBe('ab-');
	});	
	
	it('Click on [Save]', function() {
		expect(browser.driver.findElement(by.xpath("//button[@type='submit']")).isDisplayed());
		browser.driver.findElement(by.xpath("//button[@type='submit']")).click();
		browser.sleep(50000);
	});

	it('Click on [Close] for alert', function() {
		browser.wait(element(by.xpath("//md-dialog-actions/button")).getWebElement());	
		expect(browser.driver.findElement(by.xpath("//md-dialog-actions/button")).isDisplayed());
		browser.driver.findElement(by.xpath("//md-dialog-actions/button")).click();		
		//For execution checkup
		browser.sleep(1000);
	});
});






