describe("StartUp", function() {

	it('Open Norse Sample Application', function() {
		browser.driver.get('http://localhost:3000/#!/login');
		expect(browser.getCurrentUrl()).toContain('localhost:3000');
		browser.driver.sleep(3000);	
		// Validating with Title
		expect(browser.driver.getTitle()).toEqual("Norse");
	});	
});

describe("Open Registration form", function() {
	it('Click on [Register Now]', function() {
		expect(browser.driver.findElement(by.linkText('Register Now')).isDisplayed());
		browser.driver.findElement(by.linkText('Register Now')).click();
	});		
});

describe("Registration Form TestCases", function() {	
	
	it('Enter FirstName', function() {
		browser.driver.findElement(by.name('firstName')).sendKeys('Norse');
		expect(browser.driver.findElement(by.name('firstName')).getAttribute('value').length).not.toEqual(0);
	});
	it('Enter LastName', function() {
		browser.driver.findElement(by.name('lastName')).sendKeys('Demo');
		expect(browser.driver.findElement(by.name('lastName')).getAttribute('value')).not.toBe('demo');
	});
	it('Enter Email', function() {
		browser.driver.findElement(by.name('email')).sendKeys('norse@gmail.com');
		expect(browser.driver.findElement(by.name('email')).getAttribute('value')).toContain('@');
	});
	it('Enter Phone Number', function() {
		browser.driver.findElement(by.name('phone')).sendKeys('9705550336');
		expect(browser.driver.findElement(by.name('phone')).getAttribute('value')).toBe('9705550336');
	});
	it('Enter Password', function() {
		browser.driver.findElement(by.name('password')).sendKeys('Enlume@123');
		expect(browser.driver.findElement(by.name('password')).getAttribute('value')).not.toBe('enlume@123');
	});
	it('Enter ConformPassword', function() {
		browser.driver.findElement(by.name('cPassword')).sendKeys('Enlume@123');
		expect(browser.driver.findElement(by.name('cPassword')).getAttribute('value')).toBe('Enlume@123');
	});
	it('Enter BloodGroup', function() {
		browser.driver.findElement(by.name('bloodGroup')).sendKeys('AB-');
		expect(browser.driver.findElement(by.name('bloodGroup')).getAttribute('value')).toBe('ab-');
	});
	it('Enter Address', function() {
		browser.driver.findElement(by.name('address')).sendKeys('Kurnool');
		expect(browser.driver.findElement(by.name('address')).getAttribute('value')).toBe('Kurnool');
	});
	it('Enter PinCode', function() {
		browser.driver.findElement(by.name('pinCode')).sendKeys('518465');
		expect(browser.driver.findElement(by.name('pinCode')).getAttribute('value')).toBe('518465');
	});
	it('Click on [Save]', function() {
		expect(browser.driver.findElement(by.xpath("//button[@type='submit']")).isDisplayed());
		browser.driver.findElement(by.xpath("//button[@type='submit']")).click();		
	});

});
