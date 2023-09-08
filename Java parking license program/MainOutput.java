import java.time.*;
import java.util.*;

public class MainOutput {
    public static void main(String args[]) {

        System.out.println("\n");

        String licence = "person1";
        var registeredDate1 = LocalDate.of(2046, 5, 15);
        var registeredDate2 = LocalDate.of(2046, 5, 30);

        var vp = new VisitorParking(licence, registeredDate1);
        vp.addVisitorReservation(licence, registeredDate2);

        HashMap<String, TreeSet<LocalDate>> record = vp.getParkingRecord();
        for (String license : record.keySet()) {
            TreeSet<LocalDate> dates = record.get(license);
            System.out.println("License: " + license + "\n");
            System.out.println("Date's registered");
            for (LocalDate date : dates) {
                System.out.println(" ");
                System.out.println(date);
            }
            System.out.println("\n");
        }

        System.out.println("License is registered for the registration date(s), plus an additional 2 days.\n");
        System.out.println("Here are all the days the license is valid:\n");
        System.out.println(vp.getAllDaysLicenceIsRegistered(licence));
        System.out.println("\nThanks for using the registration program!\n");
    }

}
