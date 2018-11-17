import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';

import { get, post, put, patch, del } from 'helpers/rest';

describe('Rest get', function() {
  beforeEach(function() {
    this.fakeGet = sinon.stub(axios, 'get');
  });

  afterEach(function() {
    this.fakeGet.restore();
  });

  it('should call axios.get() with params', function() {
    get('/index', { foo: 'bar' });
    expect(
      this.fakeGet.calledWith('/index', { params: { foo: 'bar' } })
    ).to.equal(true);
  });

  it('get() should call axios.get() with empty params by default', function() {
    get('/index');
    expect(this.fakeGet.calledWith('/index', { params: {} })).to.equal(true);
  });
});

describe('Rest post put patch delete', function() {
  it('post() should call axios.post() with params', function() {
    const call = sinon.stub(axios, 'post');
    post('/index', { foo: 'bar' });
    expect(call.calledWith('/index', { foo: 'bar' })).to.equal(true);
  });

  it('put() should call axios.put() with params', function() {
    const call = sinon.stub(axios, 'put');
    put('/index', { foo: 'bar' });
    expect(call.calledWith('/index', { foo: 'bar' })).to.equal(true);
  });

  it('patch() should call axios.patch() with params', function() {
    const call = sinon.stub(axios, 'patch');
    patch('/index', { foo: 'bar' });
    expect(call.calledWith('/index', { foo: 'bar' })).to.equal(true);
  });

  it('del() should call axios.delete() with params', function() {
    const call = sinon.stub(axios, 'delete');
    del('/index', { foo: 'bar' });
    expect(call.calledWith('/index', { foo: 'bar' })).to.equal(true);
  });
});
