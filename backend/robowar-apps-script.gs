/**
 * ============================================================================
 * ROBOWAR REGISTRATION FORM - GOOGLE APPS SCRIPT
 * ============================================================================
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to: Extensions → Apps Script
 * 3. Delete any existing code
 * 4. Copy and paste this ENTIRE file
 * 5. Save (Ctrl+S or File → Save)
 * 6. Deploy as Web App:
 *    - Click Deploy → New deployment
 *    - Click gear icon → Select "Web app"
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click Deploy
 * 7. Copy the Web App URL
 * 8. Update SCRIPT_URL in Robowar.jsx with this URL
 * 
 * ============================================================================
 */

/**
 * Main function that handles POST requests from the frontend form
 */
function doPost(e) {
  try {
    // Log incoming data for debugging
    Logger.log("========== NEW FORM SUBMISSION ==========");
    Logger.log("Received data: " + JSON.stringify(e.parameter));
    
    // Open your Google Sheet (UPDATE THIS URL IF NEEDED)
    const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/17Hg1QV12kf6n87ta6RAoXJy4MU4U-w2EMn0FsmtWZ2k/edit?gid=0#gid=0";
    const sheet = SpreadsheetApp.openByUrl(spreadsheetUrl).getSheetByName('Sheet1');
    
    if (!sheet) {
      throw new Error("Sheet 'Sheet1' not found. Please create it or update the sheet name in the script.");
    }

    // Get form data
    let data = e.parameter;
    
    // Log important fields
    Logger.log("Team: " + data.TeamName);
    Logger.log("Email: " + data.TeamLeaderEmail);
    Logger.log("College Type: " + data.CollegeType);
    Logger.log("College Name: " + data.CollegeName);
    Logger.log("Wants Kit: " + data.WantsKit);
    Logger.log("Motor Option: " + data.MotorOption);
    Logger.log("Weight Category: " + data.WeightCategory);
    Logger.log("Total Amount: " + data.TotalAmount);

    // ========== DATA PROCESSING ==========
    
    // Determine if from NIT Silchar (for column I)
    const isNITSilchar = data.CollegeType === "NIT Silchar" ? "Yes" : "No";
    
    // Determine if taking kit (for column J)
    const willTakeKit = data.WantsKit === "Yes" ? "Yes" : "No";
    
    // Determine kit type/motor option (for column K)
    let kitType = "N/A";
    if (data.WantsKit === "Yes" && data.MotorOption && data.MotorOption !== "N/A") {
      switch(data.MotorOption.toLowerCase()) {
        case "rpm":
          kitType = "High RPM Motor";
          break;
        case "torque":
          kitType = "High Torque Motor";
          break;
        case "both":
          kitType = "Both Motors";
          break;
        default:
          kitType = "N/A";
      }
    }

    // Weight category is already formatted from frontend
    const weightCategory = data.WeightCategory || "Not selected";

    // ========== APPEND DATA TO SHEET ==========
    
    /**
     * COLUMN MAPPING:
     * A: Timestamp
     * B: Team Leader Email
     * C: Team Name
     * D: Team Leader Name
     * E: Team Leader Phone
     * F: Team Leader WhatsApp
     * G: Team Leader Scholar ID
     * H: College Name
     * I: Are you from NIT Silchar?
     * J: Will you take kit?
     * K: Kit Type (Motor Option)
     * L: Weight Category
     * M: Team Member 2
     * N: Team Member 3
     * O: Team Member 4
     * P: Team Member 5
     * Q: Team Member 6
     * R: Total Amount
     * S: Payment Proof Link
     * T: Transaction Number
     */
    
    sheet.appendRow([
      data.Timestamp || new Date().toISOString(),           // A
      data.TeamLeaderEmail || "",                           // B
      data.TeamName || "",                                  // C
      data.TeamLeaderName || "",                            // D
      data.TeamLeaderPhone || "",                           // E
      data.TeamLeaderWhatsapp || "",                        // F
      data.TeamLeaderScholarId || "",                       // G
      data.CollegeName || "",                               // H
      isNITSilchar,                                         // I - Formatted
      willTakeKit,                                          // J - Formatted
      kitType,                                              // K - Formatted
      weightCategory,                                       // L - NEW!
      data.TeamMemberSecond || "",                          // M
      data.TeamMemberThird || "",                           // N
      data.TeamMemberFourth || "",                          // O
      data.TeamMemberFifth || "",                           // P
      data.TeamMemberSixth || "",                           // Q
      data.TotalAmount || "",                               // R
      data.PaymentProofLink || "",                          // S
      data.TransactionNumber || ""                          // T
    ]);

    Logger.log("✅ Data saved successfully to sheet!");
    Logger.log("========================================");
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'success',
        message: 'Registration submitted successfully!'
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error for debugging
    Logger.log("❌ ERROR: " + error.toString());
    Logger.log("Stack trace: " + error.stack);
    
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'error',
        message: 'Error: ' + error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - Run this to verify the script works
 * 
 * HOW TO USE:
 * 1. Select "testDoPost" from the function dropdown at the top
 * 2. Click the Run button (▶️)
 * 3. Check your Google Sheet for the test entry
 * 4. Check Executions log for any errors
 */
function testDoPost() {
  Logger.log("========== RUNNING TEST ==========");
  
  // Test data simulating a form submission
  const testData = {
    parameter: {
      Timestamp: new Date().toISOString(),
      TeamLeaderEmail: "test@example.com",
      TeamName: "Test Warriors",
      TeamLeaderName: "John Doe",
      TeamLeaderPhone: "9876543210",
      TeamLeaderWhatsapp: "9876543210",
      TeamLeaderScholarId: "2021001",
      CollegeName: "IIT Delhi",                    // Test: Other college
      CollegeType: "Other College",
      WantsKit: "No",
      MotorOption: "N/A",
      WeightCategory: "Heavyweight (15kg and below)",  // NEW!
      TeamMemberSecond: "Jane Smith",
      TeamMemberThird: "Bob Johnson",
      TeamMemberFourth: "Alice Williams",
      TeamMemberFifth: "",
      TeamMemberSixth: "",
      TotalAmount: "2000",
      PaymentProofLink: "https://drive.google.com/file/d/test123",
      TransactionNumber: "TEST123456"
    }
  };
  
  // Run the doPost function with test data
  const result = doPost(testData);
  
  Logger.log("Test completed!");
  Logger.log("Result: " + result.getContent());
  Logger.log("==================================");
  
  // You can also test NIT Silchar with kit
  testNITSilcharWithKit();
}

/**
 * Additional test for NIT Silchar student with kit
 */
function testNITSilcharWithKit() {
  Logger.log("========== TESTING NIT SILCHAR WITH KIT ==========");
  
  const testData = {
    parameter: {
      Timestamp: new Date().toISOString(),
      TeamLeaderEmail: "nitsilchar@example.com",
      TeamName: "NIT Warriors",
      TeamLeaderName: "Rahul Kumar",
      TeamLeaderPhone: "9123456789",
      TeamLeaderWhatsapp: "9123456789",
      TeamLeaderScholarId: "2110001",
      CollegeName: "NIT Silchar",                  // Auto-filled for NIT
      CollegeType: "NIT Silchar",
      WantsKit: "Yes",
      MotorOption: "rpm",                          // High RPM Motor
      WeightCategory: "Lightweight (8kg and below)",  // NEW!
      TeamMemberSecond: "Priya Singh",
      TeamMemberThird: "Amit Sharma",
      TeamMemberFourth: "Sneha Patel",
      TeamMemberFifth: "Vikram Reddy",
      TeamMemberSixth: "",
      TotalAmount: "4200",
      PaymentProofLink: "https://drive.google.com/file/d/test456",
      TransactionNumber: "NIT456789"
    }
  };
  
  const result = doPost(testData);
  
  Logger.log("NIT Silchar test completed!");
  Logger.log("Result: " + result.getContent());
  Logger.log("================================================");
}

/**
 * Helper function to setup the sheet headers
 * Run this ONCE to add headers to your sheet
 */
function setupSheetHeaders() {
  Logger.log("========== SETTING UP HEADERS ==========");
  
  const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/17Hg1QV12kf6n87ta6RAoXJy4MU4U-w2EMn0FsmtWZ2k/edit?gid=0#gid=0";
  const sheet = SpreadsheetApp.openByUrl(spreadsheetUrl).getSheetByName('Sheet1');
  
  if (!sheet) {
    Logger.log("❌ Sheet 'Sheet1' not found!");
    return;
  }
  
  // Check if headers already exist
  if (sheet.getLastRow() > 0) {
    Logger.log("⚠️ Sheet already has data. Are you sure you want to add headers?");
    Logger.log("If yes, manually clear row 1 and run this function again.");
    return;
  }
  
  // Add headers
  const headers = [
    "Timestamp",
    "Team Leader Email",
    "Team Name",
    "Team Leader Name",
    "Team Leader Phone",
    "Team Leader WhatsApp",
    "Team Leader Scholar ID",
    "College Name",
    "Are you from NIT Silchar?",
    "Will you take kit?",
    "Kit Type (Motor Option)",
    "Weight Category",              // NEW COLUMN!
    "Team Member 2",
    "Team Member 3",
    "Team Member 4",
    "Team Member 5",
    "Team Member 6",
    "Total Amount",
    "Payment Proof Link",
    "Transaction Number"
  ];
  
  sheet.appendRow(headers);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#ff0000");  // Red background
  headerRange.setFontColor("#ffffff");   // White text
  
  Logger.log("✅ Headers added successfully!");
  Logger.log("========================================");
}

/**
 * Get execution logs (useful for debugging)
 */
function viewRecentExecutions() {
  Logger.log("To view execution logs:");
  Logger.log("1. Click 'Executions' in the left sidebar");
  Logger.log("2. Click on any execution to see detailed logs");
  Logger.log("3. Look for errors or success messages");
}
