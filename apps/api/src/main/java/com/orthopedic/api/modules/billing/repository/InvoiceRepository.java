package com.orthopedic.api.modules.billing.repository;

import com.orthopedic.api.modules.billing.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);

    @Query("SELECT SUM(i.totalAmount) FROM Invoice i WHERE i.status = 'PAID' AND i.deleted = false")
    java.math.BigDecimal sumTotalRevenue();

    @Query("SELECT i FROM Invoice i WHERE i.patient.id = :patientId AND i.deleted = false")
    List<Invoice> findByPatientId(@Param("patientId") UUID patientId);

    @Query("SELECT i FROM Invoice i WHERE i.appointment.id = :appointmentId AND i.deleted = false")
    List<Invoice> findByAppointmentId(@Param("appointmentId") UUID appointmentId);
}
