import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { CheckCircle, Circle, Clock, AlertCircle, Users, Download, Share2, ExternalLink, DollarSign, Calendar, Building } from 'lucide-react'
import limitlessLogo from './assets/limitless_energy_logo.png'
import './App.css'

// Enhanced checklist data structure with detailed vendor recommendations
const checklistData = [
  {
    id: 'legal-regulatory',
    title: 'Legal & Regulatory Compliance',
    description: 'Complete LLC formation and regulatory requirements',
    priority: 'immediate',
    timeframe: '7-30 days',
    totalBudget: '$2,000-4,000',
    items: [
      {
        id: 'publication-requirement',
        text: 'Publication Requirement: Publish LLC formation notice in two newspapers for six consecutive weeks',
        priority: 'immediate',
        timeframe: '7 days',
        budget: '$800-1,200',
        status: 'partial',
        vendor: {
          name: 'New York Law Journal & NY Daily News',
          description: 'Required legal publication for LLC formation in NY',
          contact: 'Contact local newspapers directly',
          implementation: 'Submit publication notice immediately after LLC formation'
        }
      },
      {
        id: 'operating-agreement',
        text: 'Operating Agreement: Draft and execute comprehensive LLC Operating Agreement',
        priority: 'immediate',
        timeframe: '7 days',
        budget: '$1,500-3,000',
        status: 'pending',
        vendor: {
          name: 'Energy Law Specialist',
          description: 'Attorney specializing in renewable energy business structures',
          contact: 'Recommend firms familiar with solar industry regulations',
          implementation: 'Schedule consultation within 3 days of LLC formation'
        }
      },
      {
        id: 'federal-ein',
        text: 'Federal EIN Application: Apply for Employer Identification Number through IRS.gov',
        priority: 'immediate',
        timeframe: '3 days',
        budget: 'Free',
        status: 'pending',
        vendor: {
          name: 'IRS.gov Online Application',
          description: 'Official IRS online EIN application system',
          contact: 'https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online',
          implementation: 'Apply online immediately after LLC formation'
        }
      },
      {
        id: 'nys-tax-registration',
        text: 'NYS Tax Registration: Register with NY Department of Taxation and Finance',
        priority: 'high',
        timeframe: '14 days',
        budget: 'Varies',
        status: 'pending',
        vendor: {
          name: 'NY Department of Taxation and Finance',
          description: 'State tax registration for business operations',
          contact: 'https://www.tax.ny.gov/bus/',
          implementation: 'Register within 14 days of obtaining EIN'
        }
      },
      {
        id: 'nyserda-der-registration',
        text: 'NYSERDA DER Provider Registration: Register as Distributed Energy Resource Provider',
        priority: 'high',
        timeframe: '30 days',
        budget: 'Application fees',
        status: 'pending',
        vendor: {
          name: 'NYSERDA',
          description: 'Required registration for solar energy providers in NY',
          contact: 'https://www.nyserda.ny.gov/',
          implementation: 'Submit application after obtaining all required licenses'
        }
      }
    ]
  },
  {
    id: 'licensing-certifications',
    title: 'Licensing & Certifications',
    description: 'Obtain required licenses and professional certifications',
    priority: 'immediate',
    timeframe: '14-60 days',
    totalBudget: '$2,000-4,000',
    items: [
      {
        id: 'nyc-general-contractor',
        text: 'NYC General Contractor License: Apply through NYC Department of Buildings',
        priority: 'immediate',
        timeframe: '14 days',
        budget: '$300-500',
        status: 'pending',
        vendor: {
          name: 'NYC Department of Buildings',
          description: 'Required license for solar installation work in NYC',
          contact: 'https://www1.nyc.gov/site/buildings/',
          implementation: 'Submit application with insurance certificates and experience documentation'
        }
      },
      {
        id: 'solar-one-verification',
        text: 'Solar One License Verification: Confirm partner maintains active licenses',
        priority: 'immediate',
        timeframe: '7 days',
        budget: 'None',
        status: 'pending',
        vendor: {
          name: 'Solar One Partnership',
          description: 'Verify partner licensing for collaborative projects',
          contact: 'Direct coordination with Solar One management',
          implementation: 'Request current license documentation and insurance certificates'
        }
      },
      {
        id: 'nyserda-contractor-app',
        text: 'NY-Sun Participating Contractor Application: Submit comprehensive application',
        priority: 'high',
        timeframe: '30 days',
        budget: '$500-1,000',
        status: 'pending',
        vendor: {
          name: 'NYSERDA NY-Sun Program',
          description: 'Required certification for NY solar incentive programs',
          contact: 'https://www.nyserda.ny.gov/All-Programs/Programs/NY-Sun',
          implementation: 'Complete application with insurance, licensing, and experience documentation'
        }
      },
      {
        id: 'nabcep-certification',
        text: 'NABCEP Certification: Obtain PV Installation Professional Certification',
        priority: 'medium',
        timeframe: '60 days',
        budget: '$1,000-2,000',
        status: 'pending',
        vendor: {
          name: 'North American Board of Certified Energy Practitioners',
          description: 'Industry-standard professional certification for solar installers',
          contact: 'https://www.nabcep.org/',
          implementation: 'Schedule exam after completing required training hours'
        }
      }
    ]
  },
  {
    id: 'insurance-risk',
    title: 'Insurance & Risk Management',
    description: 'Secure comprehensive business insurance coverage',
    priority: 'immediate',
    timeframe: '5-21 days',
    totalBudget: '$8,000-15,000/year',
    items: [
      {
        id: 'general-liability',
        text: 'General Liability Insurance: $1M per occurrence, $2M aggregate minimum',
        priority: 'immediate',
        timeframe: '5 days',
        budget: '$2,000-4,000/year',
        status: 'pending',
        vendor: {
          name: 'Commercial Insurance Broker (Solar Specialist)',
          description: 'Specialized broker for renewable energy contractors',
          contact: 'Recommend brokers with solar industry experience',
          implementation: 'Obtain quotes from 3+ brokers specializing in solar contractors'
        }
      },
      {
        id: 'professional-liability',
        text: 'Professional Liability Insurance: Required for design and consulting services',
        priority: 'immediate',
        timeframe: '5 days',
        budget: '$1,500-3,000/year',
        status: 'pending',
        vendor: {
          name: 'Professional Liability Specialist',
          description: 'Coverage for design errors and professional services',
          contact: 'Include with general liability package',
          implementation: 'Bundle with general liability for cost savings'
        }
      },
      {
        id: 'commercial-auto',
        text: 'Commercial Auto Insurance: $1M combined single limits minimum',
        priority: 'high',
        timeframe: '14 days',
        budget: '$1,200-2,500/year',
        status: 'pending',
        vendor: {
          name: 'Commercial Auto Insurance Provider',
          description: 'Coverage for business vehicles and equipment transport',
          contact: 'Major insurers: Progressive, State Farm Commercial, Travelers',
          implementation: 'Coordinate with general liability broker for package pricing'
        }
      },
      {
        id: 'cyber-liability',
        text: 'Cyber Liability Insurance: Essential for customer data protection',
        priority: 'high',
        timeframe: '14 days',
        budget: '$800-1,500/year',
        status: 'pending',
        vendor: {
          name: 'Cyber Security Insurance Specialist',
          description: 'Protection against data breaches and cyber attacks',
          contact: 'Specialized cyber insurance providers',
          implementation: 'Required for CRM and customer data management systems'
        }
      },
      {
        id: 'workers-comp',
        text: 'Workers Compensation Insurance: Required before hiring first employee',
        priority: 'medium',
        timeframe: 'Before hiring',
        budget: 'Varies by payroll',
        status: 'pending',
        vendor: {
          name: 'Workers Compensation Insurance',
          description: 'Required coverage for all employees',
          contact: 'State-approved workers comp insurers',
          implementation: 'Activate before first employee start date'
        }
      }
    ]
  },
  {
    id: 'financial-banking',
    title: 'Financial Setup & Banking',
    description: 'Establish business banking and financial systems',
    priority: 'immediate',
    timeframe: '3-30 days',
    totalBudget: '$3,000-8,000 setup + monthly fees',
    items: [
      {
        id: 'business-checking',
        text: 'Primary Business Checking Account: Open with major bank',
        priority: 'immediate',
        timeframe: '3 days',
        budget: '$15-50/month',
        status: 'pending',
        vendor: {
          name: 'Chase Business Banking or Bank of America',
          description: 'Major bank with business banking services',
          contact: 'Local business banking centers',
          implementation: 'Schedule appointment with business banker, bring LLC documents and EIN'
        }
      },
      {
        id: 'business-credit-card',
        text: 'Business Credit Card: Apply for business credit card with rewards',
        priority: 'immediate',
        timeframe: '7 days',
        budget: '$0-200/year',
        status: 'pending',
        vendor: {
          name: 'Chase Ink Business or Capital One Spark',
          description: 'Business credit cards with rewards and expense tracking',
          contact: 'Apply online or through business banker',
          implementation: 'Apply after opening business checking account'
        }
      },
      {
        id: 'accounting-software',
        text: 'Accounting Software Setup: QuickBooks Online Advanced',
        priority: 'high',
        timeframe: '14 days',
        budget: '$200/month',
        status: 'pending',
        vendor: {
          name: 'QuickBooks Online Advanced',
          description: 'Comprehensive accounting software for project-based businesses',
          contact: 'https://quickbooks.intuit.com/',
          implementation: 'Set up chart of accounts for solar project tracking, integrate with banking'
        }
      },
      {
        id: 'line-of-credit',
        text: 'Line of Credit Application: Apply for $250K-500K business line of credit',
        priority: 'medium',
        timeframe: '30 days',
        budget: 'Interest/fees',
        status: 'pending',
        vendor: {
          name: 'Business Banking Line of Credit',
          description: 'Revolving credit facility for project financing and cash flow',
          contact: 'Business banker at primary banking relationship',
          implementation: 'Apply after establishing banking relationship and financial statements'
        }
      }
    ]
  },
  {
    id: 'operational-infrastructure',
    title: 'Operational Infrastructure',
    description: 'Complete office setup and operational systems',
    priority: 'immediate',
    timeframe: '7-60 days',
    totalBudget: '$15,000-25,000 setup + $800-1,200/month',
    items: [
      {
        id: 'microsoft-365-setup',
        text: 'Microsoft 365 Business Premium: Email, collaboration, cloud storage foundation',
        priority: 'immediate',
        timeframe: '7 days',
        budget: '$22/user/month (5 users = $110/month)',
        status: 'pending',
        vendor: {
          name: 'Microsoft 365 Business Premium',
          description: 'Complete productivity suite with advanced security and collaboration tools',
          contact: 'Microsoft partner or direct from Microsoft',
          implementation: 'Set up tenant, migrate email, configure SharePoint and Teams'
        }
      },
      {
        id: 'network-infrastructure',
        text: 'Network Infrastructure: Business internet, backup, security, wireless',
        priority: 'high',
        timeframe: '14 days',
        budget: '$200-300/month + $800 equipment',
        status: 'pending',
        vendor: {
          name: 'Verizon Fios Business + T-Mobile 5G + SonicWall + Ubiquiti',
          description: 'Primary: Verizon Fios 500Mbps ($80-120/month), Backup: T-Mobile 5G ($50/month), Security: SonicWall TZ470 ($350), WiFi: Ubiquiti UniFi ($150-200 each)',
          contact: 'Verizon Business, T-Mobile Business, authorized resellers',
          implementation: 'Schedule Verizon installation, configure network security and WiFi'
        }
      }
    ]
  },
  {
    id: 'cloud-server-it-infrastructure',
    title: 'Cloud Server and IT Infrastructure',
    description: 'Implement cloud-based computing and IT infrastructure',
    priority: 'high',
    timeframe: '7-30 days',
    totalBudget: '$500-2,000/month',
    items: [
      {
        id: 'microsoft-azure-cloud',
        text: 'Microsoft Azure Cloud Services: Virtual machines, storage, and backup solutions',
        priority: 'high',
        timeframe: '14 days',
        budget: '$200-800/month',
        status: 'pending',
        vendor: {
          name: 'Microsoft Azure',
          description: 'Enterprise cloud platform with virtual machines, storage, and integrated Microsoft 365 services',
          contact: 'https://azure.microsoft.com/ - Microsoft partner or direct Azure sales',
          implementation: 'Set up Azure tenant, configure virtual machines, implement backup and disaster recovery'
        }
      },
      {
        id: 'cloud-based-workstations',
        text: 'Cloud-Based Virtual Workstations: Azure Virtual Desktop for remote access',
        priority: 'high',
        timeframe: '21 days',
        budget: '$150-400/month per user',
        status: 'pending',
        vendor: {
          name: 'Azure Virtual Desktop',
          description: 'Cloud-based virtual desktop infrastructure with Windows 11 and Office 365 integration',
          contact: 'Microsoft Azure Virtual Desktop specialists',
          implementation: 'Deploy virtual desktop pools, configure user access, integrate with Active Directory'
        }
      },
      {
        id: 'cloud-storage-backup',
        text: 'Cloud Storage and Backup: OneDrive Business + Azure Backup for data protection',
        priority: 'immediate',
        timeframe: '7 days',
        budget: '$50-200/month',
        status: 'pending',
        vendor: {
          name: 'OneDrive for Business + Azure Backup',
          description: 'Comprehensive cloud storage with automated backup and file versioning',
          contact: 'Included with Microsoft 365, additional Azure Backup through Azure portal',
          implementation: 'Configure OneDrive sync, set up automated backup policies, implement retention rules'
        }
      },
      {
        id: 'cloud-security-monitoring',
        text: 'Cloud Security and Monitoring: Azure Security Center + Microsoft Defender',
        priority: 'high',
        timeframe: '14 days',
        budget: '$100-500/month',
        status: 'pending',
        vendor: {
          name: 'Azure Security Center + Microsoft Defender',
          description: 'Advanced threat protection, security monitoring, and compliance management',
          contact: 'Microsoft security specialists or certified partners',
          implementation: 'Enable security monitoring, configure threat detection, implement compliance policies'
        }
      }
    ]
  },
  {
    id: 'technology-systems',
    title: 'Technology & Systems',
    description: 'Implement software and digital infrastructure',
    priority: 'high',
    timeframe: '7-45 days',
    totalBudget: '$4,000-8,000/month',
    items: [
      {
        id: 'aurora-solar-premium',
        text: 'Aurora Solar Premium: Industry-standard solar design and proposal software',
        priority: 'immediate',
        timeframe: '14 days',
        budget: '$259/user/month (2 users = $518/month)',
        status: 'pending',
        vendor: {
          name: 'Aurora Solar Premium Plan',
          description: 'Comprehensive solar design platform with BESS modeling, LIDAR analysis, and bankable shade reports',
          contact: 'https://aurorasolar.com/ - Schedule demo with sales team',
          implementation: 'Set up accounts, complete training certification, integrate with CRM'
        }
      },
      {
        id: 'hubspot-crm',
        text: 'HubSpot CRM: Customer relationship management with Microsoft 365 integration',
        priority: 'immediate',
        timeframe: '14 days',
        budget: '$20-890/month (scaling with contacts)',
        status: 'pending',
        vendor: {
          name: 'HubSpot Marketing Hub Standard',
          description: 'CRM with marketing automation, lead scoring, and Microsoft 365 integration',
          contact: 'https://www.hubspot.com/ - Start with free tier, upgrade to Standard',
          implementation: 'Configure pipelines for solar sales cycle, set up automation workflows'
        }
      },
      {
        id: 'microsoft-project',
        text: 'Microsoft Project Professional: Project management for solar installations',
        priority: 'high',
        timeframe: '21 days',
        budget: '$30/user/month',
        status: 'pending',
        vendor: {
          name: 'Microsoft Project Plan 3',
          description: 'Enterprise project management with Teams integration and resource planning',
          contact: 'Microsoft 365 admin center or Microsoft partner',
          implementation: 'Set up project templates for solar installations, integrate with Teams'
        }
      },
      {
        id: 'communication-enhancement',
        text: 'Enhanced Communication: Teams Phone + Viva Suite for collaboration',
        priority: 'medium',
        timeframe: '30 days',
        budget: '$20/user/month additional',
        status: 'pending',
        vendor: {
          name: 'Microsoft Teams Phone + Viva Suite',
          description: 'Teams Phone ($8/user/month) + Viva Suite ($12/user/month) for enhanced collaboration',
          contact: 'Microsoft 365 admin center',
          implementation: 'Configure phone system, set up call routing, deploy Viva tools'
        }
      }
    ]
  },
  {
    id: 'marketing-sales',
    title: 'Marketing & Sales Setup',
    description: 'Establish marketing presence and sales processes',
    priority: 'high',
    timeframe: '7-60 days',
    totalBudget: '$2,000-5,000 setup + $500-2,000/month',
    items: [
      {
        id: 'mailchimp-automation',
        text: 'Mailchimp Standard: Email marketing automation with Microsoft 365 integration',
        priority: 'immediate',
        timeframe: '14 days',
        budget: '$20-350/month (scaling with contacts)',
        status: 'pending',
        vendor: {
          name: 'Mailchimp Standard Plan',
          description: 'Email marketing automation with advanced segmentation and Microsoft 365 integration',
          contact: 'https://mailchimp.com/ - Start with Standard plan',
          implementation: 'Set up automated lead nurturing campaigns, integrate with HubSpot CRM'
        }
      },
      {
        id: 'website-optimization',
        text: 'Webflow Professional: Advanced website optimization with visual design capabilities',
        priority: 'high',
        timeframe: '14 days',
        budget: '$23/month (annual billing)',
        status: 'in-progress',
        vendor: {
          name: 'Webflow Professional',
          description: 'Visual web design platform with advanced CMS and professional functionality',
          contact: 'https://webflow.com/ - Optimize current Webflow site with Professional features',
          implementation: 'Enhance current site with advanced interactions, CMS optimization, and lead capture forms'
        }
      },
      {
        id: 'social-media-management',
        text: 'Hootsuite Professional: Social media management and scheduling',
        priority: 'medium',
        timeframe: '14 days',
        budget: '$99/month',
        status: 'pending',
        vendor: {
          name: 'Hootsuite Professional',
          description: 'Social media management for 10 accounts with team collaboration',
          contact: 'https://hootsuite.com/ - Professional plan',
          implementation: 'Set up LinkedIn, Twitter, Facebook accounts, create content calendar'
        }
      },
      {
        id: 'lead-generation-tools',
        text: 'Lead Generation Tools: Calendly + Typeform + Unbounce for conversion optimization',
        priority: 'medium',
        timeframe: '30 days',
        budget: '$146/month total',
        status: 'pending',
        vendor: {
          name: 'Calendly Pro + Typeform Pro + Unbounce Launch',
          description: 'Calendly ($12/month), Typeform ($35/month), Unbounce ($99/month) for complete lead generation',
          contact: 'Individual vendor websites for each tool',
          implementation: 'Set up appointment booking, lead qualification forms, landing pages'
        }
      }
    ]
  },
  {
    id: 'partnerships',
    title: 'Partnership & Vendor Management',
    description: 'Formalize partnerships and vendor relationships',
    priority: 'high',
    timeframe: '7-90 days',
    totalBudget: '$6,000-24,000/year',
    items: [
      {
        id: 'partnerstack-implementation',
        text: 'PartnerStack Enterprise: Comprehensive partner relationship management for Solar One',
        priority: 'immediate',
        timeframe: '30 days',
        budget: '$500-2,000/month',
        status: 'pending',
        vendor: {
          name: 'PartnerStack Enterprise',
          description: 'Advanced PRM with HubSpot integration, automated payments, and partner portal',
          contact: 'https://partnerstack.com/ - Contact sales for enterprise pricing',
          implementation: 'Set up Solar One partnership portal, configure revenue sharing, integrate with HubSpot'
        }
      },
      {
        id: 'vendor-management-system',
        text: 'Gatekeeper Professional: Vendor management for equipment suppliers and subcontractors',
        priority: 'high',
        timeframe: '21 days',
        budget: '$75/month (5 users)',
        status: 'pending',
        vendor: {
          name: 'Gatekeeper Professional',
          description: 'Vendor onboarding, contract management, and performance tracking',
          contact: 'https://www.gatekeeperhq.com/ - Professional plan',
          implementation: 'Set up vendor database, onboard equipment suppliers, create approval workflows'
        }
      },
      {
        id: 'equipment-supplier-relationships',
        text: 'Equipment Supplier Network: Tier 1 solar panel, inverter, and battery storage suppliers',
        priority: 'high',
        timeframe: '30 days',
        budget: 'No direct costs',
        status: 'pending',
        vendor: {
          name: 'Hybrid Supplier Strategy',
          description: 'Direct relationships: SunPower, LG, Enphase, Tesla. Distributors: CED Greentech, Krannich Solar, Wesco',
          contact: 'Contact manufacturer sales teams and distributor account managers',
          implementation: 'Establish credit accounts, negotiate pricing, set up drop-ship arrangements'
        }
      },
      {
        id: 'professional-services-network',
        text: 'Professional Services Network: Engineering, legal, and financial partners',
        priority: 'medium',
        timeframe: '45 days',
        budget: 'Hourly/project rates',
        status: 'pending',
        vendor: {
          name: 'Specialized Professional Network',
          description: 'NABCEP certified installers, structural engineers, energy lawyers, solar financing partners',
          contact: 'Industry associations and referral networks',
          implementation: 'Vet and contract with certified professionals, establish preferred partner agreements'
        }
      }
    ]
  }
];

function App() {
  const [checkedItems, setCheckedItems] = useState(new Set())
  const [expandedSections, setExpandedSections] = useState(new Set(['operational-infrastructure']))
  const [showVendorDetails, setShowVendorDetails] = useState(new Set())

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('limitless-energy-checklist-progress')
    if (saved) {
      setCheckedItems(new Set(JSON.parse(saved)))
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('limitless-energy-checklist-progress', JSON.stringify([...checkedItems]))
  }, [checkedItems])

  const toggleItem = (itemId) => {
    const newCheckedItems = new Set(checkedItems)
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId)
    } else {
      newCheckedItems.add(itemId)
    }
    setCheckedItems(newCheckedItems)
  }

  const toggleSection = (sectionId) => {
    const newExpandedSections = new Set(expandedSections)
    if (newExpandedSections.has(sectionId)) {
      newExpandedSections.delete(sectionId)
    } else {
      newExpandedSections.add(sectionId)
    }
    setExpandedSections(newExpandedSections)
  }

  const toggleVendorDetails = (itemId) => {
    const newShowVendorDetails = new Set(showVendorDetails)
    if (newShowVendorDetails.has(itemId)) {
      newShowVendorDetails.delete(itemId)
    } else {
      newShowVendorDetails.add(itemId)
    }
    setShowVendorDetails(newShowVendorDetails)
  }

  const getTotalItems = () => {
    return checklistData.reduce((total, section) => total + section.items.length, 0)
  }

  const getCompletedItems = () => {
    return checkedItems.size
  }

  const getProgressPercentage = () => {
    return Math.round((getCompletedItems() / getTotalItems()) * 100)
  }

  const getSectionProgress = (section) => {
    const completed = section.items.filter(item => checkedItems.has(item.id)).length
    return Math.round((completed / section.items.length) * 100)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'immediate': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />
      case 'partial': return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'established': return <CheckCircle className="h-4 w-4 text-green-500" />
      default: return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const exportProgress = () => {
    const progressData = {
      exportDate: new Date().toISOString(),
      totalItems: getTotalItems(),
      completedItems: getCompletedItems(),
      progressPercentage: getProgressPercentage(),
      checkedItems: [...checkedItems],
      sections: checklistData.map(section => ({
        id: section.id,
        title: section.title,
        completed: section.items.filter(item => checkedItems.has(item.id)).length,
        total: section.items.length,
        budget: section.totalBudget
      }))
    }
    
    const blob = new Blob([JSON.stringify(progressData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `limitless-energy-checklist-progress-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const shareProgress = async () => {
    const shareData = {
      title: 'Limitless Energy Co. Launch Progress',
      text: `Launch checklist progress: ${getCompletedItems()}/${getTotalItems()} items completed (${getProgressPercentage()}%)`,
      url: window.location.href
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`)
      alert('Progress copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={limitlessLogo} 
                alt="Limitless Energy Co." 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Launch Checklist</h1>
                <p className="text-sm text-gray-600">Complete Business Setup Guide with Vendor Recommendations</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={exportProgress}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={shareProgress}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Team Progress</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{getProgressPercentage()}%</div>
              <Progress value={getProgressPercentage()} className="mt-2" />
              <p className="text-xs text-gray-500 mt-1">
                {getCompletedItems()} of {getTotalItems()} tasks completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">$53K-131K</div>
              <p className="text-xs text-gray-500 mt-1">First year total</p>
              <div className="text-sm text-gray-600 mt-2">
                <div>Setup: $6K-10K</div>
                <div>Annual: $47K-120K</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Operating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">$3.4K-8.0K</div>
              <p className="text-xs text-gray-500 mt-1">Recurring monthly costs</p>
              <div className="text-sm text-gray-600 mt-2">
                <div>Cloud & Tech: $2.2K-5.2K</div>
                <div>Operations: $1.2K-2.8K</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">12 weeks</div>
              <p className="text-xs text-gray-500 mt-1">Full deployment timeline</p>
              <div className="text-sm text-gray-600 mt-2">
                <div>Phase 1: 4 weeks</div>
                <div>Phase 2-3: 8 weeks</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checklist Sections */}
        <div className="space-y-6">
          {checklistData.map((section) => (
            <Card key={section.id} className="overflow-hidden">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={`${getPriorityColor(section.priority)} text-white border-0`}>
                        {section.priority}
                      </Badge>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{getSectionProgress(section)}% Complete</div>
                      <div className="text-xs text-gray-500">{section.totalBudget}</div>
                    </div>
                    <Progress value={getSectionProgress(section)} className="w-20" />
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {section.description} • {section.timeframe}
                </CardDescription>
              </CardHeader>

              {expandedSections.has(section.id) && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={checkedItems.has(item.id)}
                            onCheckedChange={() => toggleItem(item.id)}
                            className="mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(item.status)}
                                <Badge variant="outline" className={`${getPriorityColor(item.priority)} text-white border-0 text-xs`}>
                                  {item.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>{item.timeframe}</span>
                                <DollarSign className="h-4 w-4" />
                                <span>{item.budget}</span>
                              </div>
                            </div>
                            
                            <p className="text-sm font-medium text-gray-900 mt-2 mb-3">
                              {item.text}
                            </p>

                            {/* Vendor Information */}
                            {item.vendor && (
                              <div className="bg-white rounded-md p-3 border">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <Building className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium text-sm text-blue-900">
                                      {item.vendor.name}
                                    </span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleVendorDetails(item.id)}
                                    className="text-xs"
                                  >
                                    {showVendorDetails.has(item.id) ? 'Hide Details' : 'Show Details'}
                                  </Button>
                                </div>
                                
                                <p className="text-xs text-gray-600 mb-2">
                                  {item.vendor.description}
                                </p>

                                {showVendorDetails.has(item.id) && (
                                  <div className="space-y-2 pt-2 border-t">
                                    <div>
                                      <span className="text-xs font-medium text-gray-700">Contact: </span>
                                      <span className="text-xs text-gray-600">{item.vendor.contact}</span>
                                      {item.vendor.contact.startsWith('http') && (
                                        <a 
                                          href={item.vendor.contact} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="ml-1 inline-flex items-center"
                                        >
                                          <ExternalLink className="h-3 w-3 text-blue-500" />
                                        </a>
                                      )}
                                    </div>
                                    <div>
                                      <span className="text-xs font-medium text-gray-700">Implementation: </span>
                                      <span className="text-xs text-gray-600">{item.vendor.implementation}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Limitless Energy Co. Launch Checklist • Updated with comprehensive vendor recommendations</p>
          <p className="mt-1">Microsoft 365 integrated solutions for seamless business operations</p>
        </div>
      </div>
    </div>
  )
}

export default App

