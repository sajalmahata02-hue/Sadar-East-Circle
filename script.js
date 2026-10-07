document.getElementById('leaveForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Gather values from form inputs
    const teacherName = document.getElementById('teacherName').value;
    const designation = document.getElementById('designation').value;
    const schoolName = document.getElementById('schoolName').value;
    const circleName = document.getElementById('circleName').value;
    const dateOfJoining = document.getElementById('dateOfJoining').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const leaveType = document.getElementById('leaveType').value;

    // Calculate total days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const totalDaysText = isNaN(diffDays) ? 1 : diffDays;
    const currentDateFormatted = new Date().toLocaleDateString('en-GB');

    // Format dates nicely for display (DD/MM/YYYY)
    function formatDate(dateString) {
        if (!dateString) return '';
        const parts = dateString.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    const formattedJoiningDate = formatDate(dateOfJoining);
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // 2. Map values into the PDF template slots
    document.getElementById('lblLeaveTypeSub').innerText = leaveType;
    document.getElementById('lblLeaveTypeBody').innerText = leaveType;
    document.getElementById('lblTeacherName').innerText = teacherName;
    document.getElementById('lblDesignation').innerText = designation;
    document.getElementById('lblSchoolName').innerText = schoolName;
    document.getElementById('lblCircleName').innerText = circleName;
    document.getElementById('lblDateOfJoining').innerText = formattedJoiningDate;
    document.getElementById('lblStartDate').innerText = formattedStartDate;
    document.getElementById('lblEndDate').innerText = formattedEndDate;
    document.getElementById('lblTotalDays').innerText = totalDaysText;

    // Signature blocks mapping
    document.getElementById('lblTeacherNameSign').innerText = teacherName;
    document.getElementById('lblDesignationSign').innerText = designation;
    document.getElementById('lblSchoolNameSign').innerText = schoolName;
    document.getElementById('lblCircleSign').innerText = circleName;
    document.getElementById('lblDateOfJoiningSign').innerText = formattedJoiningDate;
    document.getElementById('lblCurrentDate').innerText = currentDateFormatted;

    // Head Teacher note blocks mapping
    document.getElementById('lblTeacherNameNote').innerText = teacherName;
    document.getElementById('lblDesignationNote').innerText = designation;
    document.getElementById('lblStartDateNote').innerText = formattedStartDate;
    document.getElementById('lblEndDateNote').innerText = formattedEndDate;
    document.getElementById('lblTotalDaysNote').innerText = totalDaysText;
    document.getElementById('lblSchoolNameNoteSign').innerText = schoolName;

    // 3. Temporarily display template, convert to PDF, then hide again
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
        alert('PDF generated successfully with Designation, Circle, and Joining Date!');
        document.getElementById('leaveForm').reset();
    });
});