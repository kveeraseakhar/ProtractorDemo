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

describe('Patient functionalities', function() {

	it('Click on Patient Menu', function() {
		browser.wait(element(by.xpath("//a[@ui-sref='main.patient']")).getWebElement());
		browser.driver.findElement(by.xpath("//a[@ui-sref='main.patient']")).click();
	});

	it('Click on [AddPatient]', function() {
		browser.wait(element(by.xpath("//div/div/a")).getWebElement());
		browser.driver.findElement(by.xpath("//div/div/a")).click();
	});
});

describe('Enter Patient Details', function() {

	it('Enter FirstName', function() {
		browser.wait(element(by.name("firstName")).getWebElement());
		browser.driver.findElement(by.name("firstName")).sendKeys("Anil");
		expect(browser.driver.findElement(by.name('firstName')).getAttribute('value').length).not.toEqual(0);
	});
	
	it('Enter LastName', function() {		
		browser.driver.findElement(by.name("lastName")).sendKeys("Kumar");
		expect(browser.driver.findElement(by.name('lastName')).getAttribute('value')).not.toBe('prasad.');
	});
	
	it('Enter Email ID', function() {
		browser.driver.findElement(by.name("email")).sendKeys("anilkumar336@gmail.com");
		expect(browser.driver.findElement(by.name('email')).getAttribute('value')).toContain('@');
	});
	
	it('Enter Phone Number', function() {
		browser.driver.findElement(by.name("phone")).sendKeys("9876543210");
		expect(browser.driver.findElement(by.name('phone')).getAttribute('value').length).toEqual(9);
	});
	
	it('Select Gender.', function() {
		//Gender
		browser.driver.findElement(by.xpath("//md-select")).click();
		//Option selection
		browser.driver.findElement(by.xpath("//md-option")).click();
	});
	
	it('Select Date.', function() {
		browser.wait(element(by.css(".md-datepicker-input.md-input")).getWebElement());
		browser.driver.findElement(by.css(".md-datepicker-input.md-input")).sendKeys("08/08/2017");
	});
	
	it('Enter BloodGroup.', function() {
		browser.driver.findElement(by.name("bloodGroup")).sendKeys("AB+");
		expect(browser.driver.findElement(by.name('bloodGroup')).getAttribute('value')).toBe('ab-');
	});
	
	it('Enter Address.', function() {
		browser.driver.findElement(by.name("address")).sendKeys("Process going on.");
		expect(browser.driver.findElement(by.name('address')).getAttribute('value')).toBe('Hyderabad.');
	});
	
	it('Enter Doctor Name.', function() {
		browser.driver.findElement(by.name("doctorName")).sendKeys("LVPrasad");
	});
	
	it('Enter Patien Age.', function() {
		browser.driver.findElement(By.name("age")).sendKeys("29");
	});
	
	it('Click on [Save]', function() {
		expect(browser.driver.findElement(by.xpath("//button[@type='submit']")).isDisplayed());
		browser.driver.findElement(by.xpath("//button[@type='submit']")).click();
	});
	
	it('Click on [Close] for alert', function() {
		browser.wait(element(by.xpath("//md-dialog-actions/button")).getWebElement());
		expect(browser.driver.findElement(by.xpath("//md-dialog-actions/button")).isDisplayed());
		browser.driver.findElement(by.xpath("//md-dialog-actions/button")).click();
		//It is for Execution check up
		browser.sleep(3000);
	});		
});

