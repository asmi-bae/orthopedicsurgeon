import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemHealthService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://localhost:8080/api/v1';
  private actuatorUrl = `${this.baseUrl.replace('/api/v1', '')}/actuator`;

  /**
   * Get overall system health
   */
  getHealth(): Observable<any> {
    return this.http.get(`${this.actuatorUrl}/health`);
  }

  /**
   * Get system metrics (CPU, Memory, etc.)
   */
  getMetrics(): Observable<any> {
    return forkJoin({
      systemCpu: this.http.get(`${this.actuatorUrl}/metrics/system.cpu.usage`),
      processCpu: this.http.get(`${this.actuatorUrl}/metrics/process.cpu.usage`),
      memoryUsed: this.http.get(`${this.actuatorUrl}/metrics/jvm.memory.used`),
      memoryMax: this.http.get(`${this.actuatorUrl}/metrics/jvm.memory.max`),
      uptime: this.http.get(`${this.actuatorUrl}/metrics/process.uptime`)
    });
  }

  /**
   * Get info (app version, etc.)
   */
  getInfo(): Observable<any> {
    return this.http.get(`${this.actuatorUrl}/info`);
  }
}
