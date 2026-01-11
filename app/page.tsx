"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Sparkles, RefreshCw, Info, Save, CheckCircle2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function Home() {
  const [riskMitigation, setRiskMitigation] = useState("")
  const [challengeThemes, setChallengeThemes] = useState("")
  const [overallSummary, setOverallSummary] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isReviewed, setIsReviewed] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    
    // Mock AI generation - simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate mock summaries
    setRiskMitigation(
      "Key risk mitigation strategies include implementing robust data validation processes, establishing clear escalation protocols, and maintaining regular stakeholder communication. Primary focus areas include ensuring compliance with regulatory requirements and minimizing operational disruptions through proactive monitoring and rapid response mechanisms."
    )
    
    setChallengeThemes(
      "Several challenge themes have emerged throughout the assessment process: technical complexity in legacy system integration, resource allocation constraints, and timeline pressures. Additionally, stakeholder alignment and change management represent ongoing considerations that require continuous attention and strategic planning."
    )
    
    setOverallSummary(
      "The overall assessment reveals a comprehensive understanding of current system capabilities and identifies strategic improvement opportunities. While certain challenges persist, the evaluation demonstrates strong foundational elements and a clear path forward. Recommendations emphasize phased implementation approaches and continued stakeholder engagement to ensure sustainable success."
    )
    
    setIsGenerating(false)
  }

  const handleSave = () => {
    if (!isReviewed) return
    
    // Mock save action - simulate a delay
    setIsSaved(true)
    
    // Reset saved state after 3 seconds
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
    
    // In a real app, you would send the data to a backend here
    console.log("Saving summaries:", {
      riskMitigation,
      challengeThemes,
      overallSummary,
      reviewedAt: new Date().toISOString()
    })
  }

  const hasContent = riskMitigation.trim() || challengeThemes.trim() || overallSummary.trim()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Banner Header */}
      <div className="bg-[#004977] text-white px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-white" />
            <div>
              <h1 className="text-2xl font-semibold">AI Assessment Assistant</h1>
              <p className="text-sm text-blue-100 mt-0.5">
                Generating summaries based on assessment data
              </p>
            </div>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            variant="secondary"
            className="bg-white text-[#004977] hover:bg-gray-100"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            Generate with AI
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Card className="bg-white shadow-sm">
          <Accordion defaultValue="summary" collapsible>
            <AccordionItem value="summary" className="border-0">
              <AccordionTrigger value="summary" className="px-6 py-4 hover:no-underline">
                <h2 className="text-lg font-semibold">Summary Notes and Annotations</h2>
              </AccordionTrigger>
              <AccordionContent value="summary" className="px-6 pb-6">
                <div className="space-y-6">
                  {/* Risk Mitigation Commentary */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className="text-sm font-medium">Risk Mitigation Commentary</label>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <Textarea
                      placeholder="Enter text"
                      value={riskMitigation}
                      onChange={(e) => setRiskMitigation(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>

                  {/* Challenge themes */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className="text-sm font-medium">Challenge themes</label>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <Textarea
                      placeholder="Enter text"
                      value={challengeThemes}
                      onChange={(e) => setChallengeThemes(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>

                  {/* Overall Assessment Results Summary */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className="text-sm font-medium">Overall Assessment Results Summary</label>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <Textarea
                      placeholder="Enter text"
                      value={overallSummary}
                      onChange={(e) => setOverallSummary(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Info Box */}
        <div className="mt-6 bg-gray-100 rounded-md px-4 py-3 flex items-start gap-3">
          <Info className="h-5 w-5 text-gray-500 mt-0.5 shrink-0" />
          <p className="text-sm text-gray-700">
            The AI summary is generated based on the <strong>Associated Objects</strong> and <strong>Process Details</strong> sections above. Please verify all generated content for accuracy before proceeding to final approvals.
          </p>
        </div>

        {/* Review and Save Section */}
        {hasContent && (
          <div className="mt-6 space-y-4">
            <Card className="bg-white shadow-sm p-6">
              <div className="flex items-start gap-3 mb-4">
                <Checkbox
                  id="review-checkbox"
                  checked={isReviewed}
                  onChange={(e) => {
                    setIsReviewed(e.target.checked)
                    setIsSaved(false) // Reset saved state if unchecked
                  }}
                  className="mt-0.5"
                />
                <label
                  htmlFor="review-checkbox"
                  className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                >
                  I have reviewed the AI-generated summaries and verified their accuracy.
                </label>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleSave}
                  disabled={!isReviewed || isSaved}
                  className="bg-[#004977] text-white hover:bg-[#003d66] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaved ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Saved Successfully
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Summaries
                    </>
                  )}
                </Button>
                {isSaved && (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Your summaries have been saved.
                  </p>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

