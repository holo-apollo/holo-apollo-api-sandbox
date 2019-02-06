import { validateEmail, validatePhone, validateLength } from '../validators';

describe('Email validator', function() {
  it('should validate correct email', function() {
    expect(validateEmail('jdoe@example.com')).toBe(true);
  });

  it('should not validate email without domain', function() {
    expect(validateEmail('jdoe@')).toBe(false);
  });

  it('should not validate email without name', function() {
    expect(validateEmail('@example.com')).toBe(false);
  });

  it('should not validate email without first level domain', function() {
    expect(validateEmail('jdoe@example')).toBe(false);
  });
});

describe('Phone validator', function() {
  it('should validate correct phone', function() {
    expect(validatePhone('+38(099) 123-45-67')).toBe(true);
  });

  it('should not validate non-digit phone', function() {
    expect(validatePhone('fooooo')).toBe(false);
  });
});

describe('Length validator', function() {
  it('should validate length correctly', function() {
    expect(validateLength('jdoe@example.com', 20, 3)).toBe(true);
  });

  it('should not validate too short value', function() {
    expect(validateLength('12', 20, 3)).toBe(false);
  });

  it('should not validate too long value', function() {
    expect(validateLength('123456789012345678901', 20, 3)).toBe(false);
  });

  it('should validate no value if min length is 0', function() {
    expect(validateLength(null, 20)).toBe(true);
  });
});
