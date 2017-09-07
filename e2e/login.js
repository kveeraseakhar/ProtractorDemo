describe("StartUp", function() {

	it('Open Norse Sample Application', function() {
		browser.driver.get('http://localhost:3000/#!/login');
		//It is mandatory for Page load.
		browser.driver.sleep(3000);	
		// Validating with Title
		//expect(browser.driver.getTitle()).toEqual("Norse");
	});	
});

describe('Login with Valid Credentials', function() {

	it('Enter UserName', function() {
		browser.driver.findElement(by.name('userName')).sendKeys('nani@gmail.com');		
	    expect(browser.driver.findElement(by.name('userName')).getAttribute()).not.toBe('');		
	});
	
	it('Enter Password', function() {		
		browser.driver.findElement(by.name('password')).sendKeys('12345');
		expect(browser.driver.findElement(by.name('password')).getAttribute('value')).not.toEqual('Norse@123');	
	});
	
	it('Click on [Login]', function() {		
		expect(browser.driver.findElement(by.xpath("//button[@type='submit']")).isDisplayed());
		browser.driver.findElement(by.xpath("//button[@type='submit']")).click();
		expect(browser.driver.getTitle()).toEqual("Norse");
	});
	
	it("Validating with title", function() {
		// Validating with Title
		expect(browser.driver.getTitle()).toEqual("Norse");
		//Need to crosscheck for Execution
		browser.sleep(1000);
	});

});
