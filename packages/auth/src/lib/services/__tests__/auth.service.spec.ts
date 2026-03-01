import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../auth.service';
import { Role } from '@repo/types';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and set current user', () => {
    const mockUser = { id: '1', firstName: 'Test', lastName: 'User', email: 'test@test.com', roles: [Role.PATIENT] };
    const mockResponse = { data: { user: mockUser, token: 'fake-jwt-token' } };

    service.login({ email: 'test@test.com', password: 'password' }).subscribe(res => {
      expect(res.data.user.email).toBe('test@test.com');
      expect(service.currentUser()?.email).toBe('test@test.com');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout and clear state', () => {
    service.logout();
    expect(service.currentUser()).toBeNull();
    expect(localStorage.getItem('auth_token')).toBeNull();
  });
});
