import java.time.*;
import java.util.*;

public class VisitorParking extends Parking {

    private HashMap<String, TreeSet<LocalDate>> parkingRecord;


    public VisitorParking() throws IllegalArgumentException {
        this.parkingRecord = new HashMap<String, TreeSet<LocalDate>>();
        return;
    }

    public VisitorParking(String license) throws IllegalArgumentException {
        this.parkingRecord = new HashMap<String, TreeSet<LocalDate>>();
        addVisitorReservation(license);
        return;
    }

    public VisitorParking(String license, LocalDate date) throws IllegalArgumentException {
        this.parkingRecord = new HashMap<String, TreeSet<LocalDate>>();
        addVisitorReservation(license, date);
        return;
    }

    public HashMap<String, TreeSet<LocalDate>> getParkingRecord() {
        return this.parkingRecord;
    }


    public void addVisitorReservation(String license) throws IllegalArgumentException {
        String newLicense = super.standardizeAndValidateLicence(license);
        LocalDate date = LocalDate.now();

        int dateCounter = 0;
        int datePlusOneCounter = 0;
        int datePlusTwoCounter = 0;

        for (TreeSet<LocalDate> dates : this.parkingRecord.values()) {
            for (LocalDate setDate : dates) {
                if (setDate.equals(date) || setDate.plusDays(1).equals(date) || setDate.plusDays(2).equals(date)) {
                    dateCounter++;
                }
                if (setDate.equals(date.plusDays(1)) || setDate.plusDays(1).equals(date.plusDays(1)) || setDate.plusDays(2).equals(date.plusDays(1))) {
                    datePlusOneCounter++;
                }
                if (setDate.equals(date.plusDays(2)) || setDate.plusDays(1).equals(date.plusDays(2)) || setDate.plusDays(2).equals(date.plusDays(2))) {
                    datePlusTwoCounter++;
                }
            }
        }

        if ((dateCounter >= 2) || (datePlusOneCounter >= 2) || (datePlusTwoCounter >= 2)) {
            throw new IllegalArgumentException("Cannot make more than two reservations on the same date.");
        }

        TreeSet<LocalDate> reservationDates = this.parkingRecord.get(newLicense);

        if (reservationDates == null) {
            reservationDates = new TreeSet<LocalDate>(Comparator.reverseOrder());
            reservationDates.add(date);
            this.parkingRecord.put(newLicense, reservationDates);
        }

        else {
            for (LocalDate reservedDate : reservationDates) {
                if (date.isEqual(reservedDate) || date.isEqual(reservedDate.plusDays(1)) || date.isEqual(reservedDate.plusDays(2))) {
                    throw new IllegalArgumentException("Cannot have overlapping dates.");
                }
                if (date.plusDays(1).isEqual(reservedDate) || date.plusDays(1).isEqual(reservedDate.plusDays(1)) || date.plusDays(1).isEqual(reservedDate.plusDays(2))) {
                    throw new IllegalArgumentException("Cannot have overlapping dates.");
                }
                if (date.plusDays(2).isEqual(reservedDate) || date.plusDays(2).isEqual(reservedDate.plusDays(1)) || date.plusDays(2).isEqual(reservedDate.plusDays(2))) {
                    throw new IllegalArgumentException("Cannot have overlapping dates.");
                }
            }

            reservationDates.add(date);
            this.parkingRecord.put(newLicense, reservationDates);

        }

        return;
    }

    public void addVisitorReservation(String license, LocalDate date) throws IllegalArgumentException {
        String newLicense = super.standardizeAndValidateLicence(license);
        if (date.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Date cannot be before today. Please try again.");
        }
        int dateCounter = 0;
        int datePlusOneCounter = 0;
        int datePlusTwoCounter = 0;

        for (TreeSet<LocalDate> dates : this.parkingRecord.values()) {
            for (LocalDate setDate : dates) {
                if (setDate.equals(date) || setDate.plusDays(1).equals(date) || setDate.plusDays(2).equals(date)) {
                    dateCounter++;
                }
                if (setDate.equals(date.plusDays(1)) || setDate.plusDays(1).equals(date.plusDays(1)) || setDate.plusDays(2).equals(date.plusDays(1))) {
                    datePlusOneCounter++;
                }
                if (setDate.equals(date.plusDays(2)) || setDate.plusDays(1).equals(date.plusDays(2)) || setDate.plusDays(2).equals(date.plusDays(2))) {
                    datePlusTwoCounter++;
                }
            }
        }

        if ((dateCounter >= 2) || (datePlusOneCounter >= 2) || (datePlusTwoCounter >= 2)) {
            throw new IllegalArgumentException("Cannot make more than two reservations on the same date.");
        }

        TreeSet<LocalDate> reservationDates = this.parkingRecord.get(newLicense);
        if (reservationDates == null) {
            reservationDates = new TreeSet<LocalDate>(Comparator.reverseOrder());
            reservationDates.add(date);
            this.parkingRecord.put(newLicense, reservationDates);
        }
        else {

            for (LocalDate reservedDate : reservationDates) {
                if (date.isEqual(reservedDate) || date.isEqual(reservedDate.plusDays(1)) || date.isEqual(reservedDate.plusDays(2))) {
                    throw new IllegalArgumentException("Cannot have overlapping dates.");
                }
                if (date.plusDays(1).isEqual(reservedDate) || date.plusDays(1).isEqual(reservedDate.plusDays(1)) || date.plusDays(1).isEqual(reservedDate.plusDays(2))) {
                    throw new IllegalArgumentException("Cannot have overlapping dates.");
                }
                if (date.plusDays(2).isEqual(reservedDate) || date.plusDays(2).isEqual(reservedDate.plusDays(1)) || date.plusDays(2).isEqual(reservedDate.plusDays(2))) {
                    throw new IllegalArgumentException("Cannot have overlapping dates.");
                }
            }

            reservationDates.add(date);
            this.parkingRecord.put(newLicense, reservationDates);

        }
        return;
    }


    public boolean licenceIsRegisteredForDate(String license) {
        String newLicense = super.standardizeAndValidateLicence(license);
        LocalDate date = LocalDate.now();
        TreeSet<LocalDate> reservationDates = this.parkingRecord.get(newLicense);
        for (LocalDate savedDate : reservationDates) {
            if (savedDate.equals(date) || savedDate.plusDays(1).equals(date) || savedDate.plusDays(2).equals(date)) {
                return true;
            }
        }
        return false;
    }

    public boolean licenceIsRegisteredForDate(String license, LocalDate date) {
        String newLicense = super.standardizeAndValidateLicence(license);
        TreeSet<LocalDate> reservationDates = this.parkingRecord.get(newLicense);
        for (LocalDate savedDate : reservationDates) {
            if (savedDate.equals(date) || savedDate.plusDays(1).equals(date) || savedDate.plusDays(2).equals(date)) {
                return true;
            }
        }
        return false;
    }


    public  ArrayList<String> getLicencesRegisteredForDate() {
        ArrayList<String> licenses = new ArrayList<String>();
        LocalDate date = LocalDate.now();
        for (String license : this.parkingRecord.keySet()) {
            TreeSet<LocalDate> reservationDates = this.parkingRecord.get(license);
            for (LocalDate savedDate : reservationDates) {
                if (savedDate.equals(date) || savedDate.plusDays(1).equals(date) || savedDate.plusDays(2).equals(date)) {
                    licenses.add(license);
                }
            }
        }
        return licenses;
    }

    public  ArrayList<String> getLicencesRegisteredForDate(LocalDate date) {
        ArrayList<String> licenses = new ArrayList<String>();
        for (String license : this.parkingRecord.keySet()) {
            TreeSet<LocalDate> reservationDates = this.parkingRecord.get(license);
            for (LocalDate savedDate : reservationDates) {
                if (savedDate.equals(date) || savedDate.plusDays(1).equals(date) || savedDate.plusDays(2).equals(date)) {
                    licenses.add(license);
                }
            }
        }
        return licenses;
    }



    public  ArrayList<LocalDate> getAllDaysLicenceIsRegistered(String license) {
        license = super.standardizeAndValidateLicence(license);
        ArrayList<LocalDate> dates = new ArrayList<LocalDate>();
        TreeSet<LocalDate> reservationDates = this.parkingRecord.get(license);
        for (LocalDate reservedDate : reservationDates) {
            dates.add(reservedDate);
            dates.add(reservedDate.plusDays(1));
            dates.add(reservedDate.plusDays(2));
        }
        Collections.sort(dates);
        return dates;
    }

    public  ArrayList<LocalDate> getStartDaysLicenceIsRegistered(String license) {
        license = super.standardizeAndValidateLicence(license);
        ArrayList<LocalDate> dates = new ArrayList<LocalDate>();
        TreeSet<LocalDate> reservationDates = this.parkingRecord.get(license);
        dates.addAll(reservationDates);
        Collections.sort(dates);
        return dates;
    }


}
