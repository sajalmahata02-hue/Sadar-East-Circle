document.getElementById('leaveForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Gather form values
    const teacherName = document.getElementById('teacherName').value;
    const designation = document.getElementById('designation').value;
    const schoolName = document.getElementById('schoolName').value;
    const circleName = document.getElementById('circleName').value;
    const dateOfJoining = document.getElementById('dateOfJoining').value;
    const leaveType = document.getElementById('leaveType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const purpose = document.getElementById('purpose').value;
    const leaveBalance = document.getElementById('leaveBalance').value;
    const leavingStation = document.getElementById('leavingStation').value;

    // Calculate total days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const totalDaysText = isNaN(diffDays) ? 1 : diffDays;

    // Format dates neatly (DD/MM/YYYY)
    function formatDate(dateString) {
        if (!dateString) return '';
        const parts = dateString.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    const formattedJoiningDate = formatDate(dateOfJoining);
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // 2. Map values to PDF template slots
    document.getElementById('lblLeaveTypeSub').innerText = leaveType;
    document.getElementById('lblLeaveTypeBody').innerText = leaveType;
    document.getElementById('lblLeaveTypeNote').innerText = leaveType;
    document.getElementById('lblTeacherName').innerText = teacherName;
    document.getElementById('lblDesignation').innerText = designation;
    document.getElementById('lblSchoolName').innerText = schoolName;
    document.getElementById('lblCircleName').innerText = circleName;
    document.getElementById('lblPurpose').innerText = purpose;
    document.getElementById('lblStartDate').innerText = formattedStartDate;
    document.getElementById('lblEndDate').innerText = formattedEndDate;
    document.getElementById('lblStartDateBody').innerText = formattedStartDate;
    document.getElementById('lblEndDateBody').innerText = formattedEndDate;
    document.getElementById('lblTotalDays').innerText = totalDaysText;
    document.getElementById('lblDateOfJoining').innerText = formattedJoiningDate;
    document.getElementById('lblLeavingStation').innerText = leavingStation;
    document.getElementById('lblLeaveBalance').innerText = leaveBalance;

    // Signatures and Notes mapping
    document.getElementById('lblTeacherNameSign').innerText = teacherName;
    document.getElementById('lblDesignationSign').innerText = designation;
    document.getElementById('lblTeacherNameNote').innerText = teacherName;
    document.getElementById('lblDesignationNote').innerText = designation;
    document.getElementById('lblStartDateNote').innerText = formattedStartDate;
    document.getElementById('lblEndDateNote').innerText = formattedEndDate;
    document.getElementById('lblTotalDaysNote').innerText = totalDaysText;
    document.getElementById('lblSchoolNameNoteSign').innerText = schoolName;

    // Determine reason category text dynamically
    let reasonCat = "medical/personal";
    if (leaveType.toLowerCase().includes("medical") || leaveType.toLowerCase().includes("commuted")) {
        reasonCat = "medical";
    } else if (leaveType.toLowerCase().includes("casual")) {
        reasonCat = "personal";
    }
    document.getElementById('lblReasonCategory').innerText = reasonCat;

    // 3. Generate PDF
    const element = document.getElementById('pdfTemplate');
    element.style.display = 'block';

    const opt = {
        margin:       10,
        filename:     `Leave_Application_${teacherName.replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save().then(() => {
        element.style.display = 'none';
        alert('Leave application PDF generated successfully!');
        document.getElementById('leaveForm').reset();
    });
});