import java.util.regex.*;

public class Parking {

    public static String standardizeAndValidateLicence(String licence) throws IllegalArgumentException {
         licence = licence.toUpperCase();
         licence = licence.replaceAll("[^\\w]", "");

         if (licence.length() <= 7 && licence.length() >= 1) {
             return licence;
         }

         String error = String.format("Licence plate '%s' is not a valid licence plate in Alberta.", licence);
         throw new IllegalArgumentException(error);
    }
}