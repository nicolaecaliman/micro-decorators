import { expect } from 'chai';
import { retry } from '../../lib';

describe('@retry', () => {
  describe('When method is synchrone.', () => {
    describe('When method should return value.', () => {
      describe('When method should work only with attempts number.', () => {
        it('should resolve with expected result and attempts greater than 0.', () => {
          class TestClass {
            @retry(3)
            test() {
              return 'Success 42.';
            }
          }

          const target = new TestClass();
          const result = target.test();

          expect(result).to.equal('Success 42.');
        });

        it('should resolve with expected result and attempts equal with 0.', () => {
          class TestClass {
            @retry(0)
            test() {
              return 'Success 42.';
            }
          }

          const target = new TestClass();
          const result = target.test();

          expect(result).to.equal('Success 42.');
        });

        it('should resolve with expected result and attempts less than 0.', () => {
          class TestClass {
            @retry(-3)
            test() {
              return 'Success 42.';
            }
          }

          const target = new TestClass();
          const result = target.test();

          expect(result).to.equal('Success 42.');
        });

        it('should resolve with expected result and attempts equal with null.', () => {
          class TestClass {
            @retry(-3)
            test() {
              return 'Success 42.';
            }
          }

          const target = new TestClass();
          const result = target.test();

          expect(result).to.equal('Success 42.');
        });

        it('should resolve with expected result and attempts equal with undefined.', () => {
          class TestClass {
            @retry(undefined)
            test() {
              return 'Success 42.';
            }
          }

          const target = new TestClass();
          const result = target.test();

          expect(result).to.equal('Success 42.');
        });
      });
    });

    describe('When method should throw error.', () => {
      describe('When method should work only with attempts number.', () => {
        it('should reject with expected error and attempts greater than 0.', () => {
          class TestClass {
            @retry(3)
            test() {
              throw new Error('Error 42.');
            }
          }

          const target = new TestClass();

          expect(() => target.test()).to.throw('Retry failed.');
        });

        it('should resolve with expected result and attempts equal with 0.', () => {
          class TestClass {
            @retry(0)
            test() {
              throw new Error('Error 42.');
            }
          }

          const target = new TestClass();

          expect(() => target.test()).to.throw('Retry failed.');
        });

        it('should reject with expected error and attempts less than 0.', () => {
          class TestClass {
            @retry(-3)
            test() {
              throw new Error('Error 42.');
            }
          }

          const target = new TestClass();

          expect(() => target.test()).to.throw('Retry failed.');
        });

        it('should reject with expected error and attempts equal with null.', () => {
          class TestClass {
            @retry(-3)
            test() {
              throw new Error('Error 42.');
            }
          }

          const target = new TestClass();

          expect(() => target.test()).to.throw('Retry failed.');
        });

        it('should reject with expected error and attempts equal with undefined.', () => {
          class TestClass {
            @retry(undefined)
            test() {
              throw new Error('Error 42.');
            }
          }

          const target = new TestClass();

          expect(() => target.test()).to.throw('Retry failed.');
        });
      });

      describe('When method should return a specific error.', () => {
        it('should throw with expected error.', () => {
          class TestClass {
            @retry(3, { onError: 'throw' })
            test() {
              throw new Error('Error 42.');
            }
          }

          const target = new TestClass();

          expect(() => target.test()).to.throw('Retry failed.');
        });

        it('should return undefined.', () => {
          class TestClass {
            @retry(3, { onError: 'ignore' })
            test() {
              throw new Error('Error 42.');
            }
          }

          const target = new TestClass();
          const response = target.test();

          expect(response).to.equal(undefined);
        });
      });

      describe('When method should throw for a specific error until attempts completted.', () => {
        it('should throw with expected error.', () => {
          class TestClass {
            @retry(3, { errorFilter: (err: Error) => err.message === 'Error 42.' })
            test() {
              throw new Error('Error 42.');
            }
          }

          const target = new TestClass();

          expect(() => target.test()).to.throw('Retry failed.');
        });

        it('should throw with default error and throw when error is expected.', () => {
          class TestClass {
            public count = 1;
            @retry(3, {
              errorFilter: (err: Error) => {
                return err.message === 'error';
              },
            })
            test() {
              if (this.count === 2) {
                throw new Error('error');
              }

              this.count += 1;
              throw new Error('Error 42.');
            }
          }

          const target = new TestClass();

          expect(() => target.test()).to.throw('Retry failed.');
          expect(target.count).to.equal(2);
        });
      });
    });
  });

  describe('When method is asynchrone.', () => {
    describe('When method should return value.', () => {
      describe('When method should work only with attempts number.', () => {
        it('should resolve with expected result and attempts greater than 0.', async () => {
          class TestClass {
            @retry(3)
            async test() {
              return Promise.resolve('Success 42.');
            }
          }

          const target = new TestClass();
          const result = await target.test();

          expect(result).to.equal('Success 42.');
        });

        it('should resolve with expected result and attempts equal with 0.', async () => {
          class TestClass {
            @retry(0)
            async test() {
              return Promise.resolve('Success 42.');
            }
          }

          const target = new TestClass();
          const result = await target.test();

          expect(result).to.equal('Success 42.');
        });

        it('should resolve with expected result and attempts less than 0.', async () => {
          class TestClass {
            @retry(-3)
            async test() {
              return Promise.resolve('Success 42.');
            }
          }

          const target = new TestClass();
          const result = await target.test();

          expect(result).to.equal('Success 42.');
        });

        it('should resolve with expected result and attempts equal with null.', async () => {
          class TestClass {
            @retry(-3)
            async test() {
              return Promise.resolve('Success 42.');
            }
          }

          const target = new TestClass();
          const result = await target.test();

          expect(result).to.equal('Success 42.');
        });

        it('should resolve with expected result and attempts equal with undefined.', async () => {
          class TestClass {
            @retry(undefined)
            async test() {
              return Promise.resolve('Success 42.');
            }
          }

          const target = new TestClass();
          const result = await target.test();

          expect(result).to.equal('Success 42.');
        });
      });
    });

    describe('When method should throw error.', () => {
      describe('When method should work only with attempts number.', () => {
        it('should reject with expected error and attempts greater than 0.', async () => {
          class TestClass {
            @retry(3)
            async test() {
              return Promise.reject('Error 42.');
            }
          }

          const target = new TestClass();

          await expect(target.test()).to.eventually.be.rejectedWith('Retry failed.');
        });

        it('should resolve with expected result and attempts equal with 0.', async () => {
          class TestClass {
            @retry(0)
            async test() {
              return Promise.reject(new Error('Error 42.'));
            }
          }

          const target = new TestClass();

          await expect(target.test()).to.eventually.be.rejectedWith('Retry failed.');
        });

        it('should reject with expected error and attempts less than 0.', async () => {
          class TestClass {
            @retry(-3)
            async test() {
              return Promise.reject(new Error('Error 42.'));
            }
          }

          const target = new TestClass();

          await expect(target.test()).to.eventually.be.rejectedWith('Retry failed.');
        });

        it('should reject with expected error and attempts equal with null.', async () => {
          class TestClass {
            @retry(-3)
            async test() {
              return Promise.reject(new Error('Error 42.'));
            }
          }

          const target = new TestClass();

          await expect(target.test()).to.eventually.be.rejectedWith('Retry failed.');
        });

        it('should reject with expected error and attempts equal with undefined.', async () => {
          class TestClass {
            @retry(undefined)
            async test() {
              return Promise.reject(new Error('Error 42.'));
            }
          }

          const target = new TestClass();

          await expect(target.test()).to.eventually.be.rejectedWith('Retry failed.');
        });
      });

      describe('When method should return a specific error.', () => {
        it('should throw with expected error.', async () => {
          class TestClass {
            @retry(3, { onError: 'reject' })
            async test() {
              return Promise.reject(new Error('Error 42.'));
            }
          }

          const target = new TestClass();

          await expect(target.test()).to.eventually.be.rejectedWith('Retry failed.');
        });

        it('should return undefined.', async () => {
          class TestClass {
            @retry(3, { onError: 'ignoreAsync' })
            async test() {
              return Promise.reject(new Error('Error 42.'));
            }
          }

          const target = new TestClass();
          const response = await target.test();

          expect(response).to.equal(undefined);
        });
      });

      // tslint:disable-next-line:max-line-length
      describe('When method should reject for a specific error until attempts completted.', () => {
        it('should throw with expected error.', async () => {
          class TestClass {
            @retry(3, { errorFilter: (err: Error) => err.message === 'Error 42.' })
            async test() {
              return Promise.reject(new Error('Error 42.'));
            }
          }

          const target = new TestClass();

          await expect(target.test()).to.eventually.be.rejectedWith('Retry failed.');
        });

        it('should throw with default error and throw when error is expected.', async () => {
          class TestClass {
            public count = 1;
            @retry(3, {
              errorFilter: (err: Error) => {
                return err.message === 'error';
              },
            })
            async test() {
              if (this.count === 2) {
                return Promise.reject(new Error('error'));
              }

              this.count += 1;
              return Promise.reject(new Error('Error 42.'));
            }
          }

          const target = new TestClass();

          await expect(target.test()).to.eventually.be.rejectedWith('Retry failed.');
          expect(target.count).to.equal(2);
        });
      });

      describe('When method should work correctly with wait pattern', () => {
        it('should wait for a specific time when pattern is number', async () => {
          class TestClass {
            private count = 1;
            private now;
            public times = [];
            @retry(3, {
              waitPattern: 100,
            })
            async test() {
              if (this.count === 1) {
                this.now = new Date().getTime();
              } else {
                const newTime = new Date().getTime() - this.now;

                this.times.push(newTime);
                this.now = new Date().getTime();
              }
              this.count += 1;
              return Promise.reject(new Error('Error 42.'));
            }
          }

          const target = new TestClass();

          await expect(target.test()).to.eventually.be.rejectedWith('Retry failed.');
          target.times.forEach((time) => {
            expect(time).to.be.approximately(100, 5);
          });
        });

        it('should wait for a specific time when pattern is array of numbers', async () => {
          class TestClass {
            private count = 1;
            private now;
            public times = [];
            @retry(3, {
              waitPattern: [100, 200, 300],
            })
            async test() {
              if (this.count === 1) {
                this.now = new Date().getTime();
              } else {
                const newTime = new Date().getTime() - this.now;

                this.times.push(newTime);
                this.now = new Date().getTime();
              }
              this.count += 1;
              return Promise.reject(new Error('Error 42.'));
            }
          }

          const target = new TestClass();

          await expect(target.test()).to.eventually.be.rejectedWith('Retry failed.');
          target.times.forEach((time, index) => {
            expect(time).to.be.approximately(100 * (index + 1), 5);
          });
        });

        it('should wait for a specific time when pattern is function', async () => {
          class TestClass {
            private count = 0;
            private now;
            public times = [];
            @retry(3, {
              waitPattern: attempt => attempt * 100,
            })
            async test() {
              if (this.count <= 1) {
                this.now = new Date().getTime();
              } else {
                const newTime = new Date().getTime() - this.now;

                this.times.push(newTime);
                this.now = new Date().getTime();
              }
              this.count += 1;
              return Promise.reject(new Error('Error 42.'));
            }
          }

          const target = new TestClass();

          await expect(target.test()).to.eventually.be.rejectedWith('Retry failed.');
          target.times.forEach((time, index) => {
            expect(time).to.be.approximately(100 * (index + 1), 5);
          });
        });

        it('should reject error if type of wait pattern is wrong', async () => {
          class TestClass {
            public times = [];
            @retry(3, {
              waitPattern: 'wait' as any,
            })
            async test() {
              return Promise.reject(new Error('Error 42.'));
            }
          }

          const target = new TestClass();

          // tslint:disable-next-line:max-line-length
          await expect(target.test()).to.eventually.be.rejectedWith('Option string is not supported for \'waitPattern\'.');
        });
      });
    });
  });
});